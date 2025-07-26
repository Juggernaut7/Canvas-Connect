// client/src/pages/WhiteboardPage.jsx
// The main collaborative whiteboard drawing page.

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoom } from '../context/RoomContext';
import { useAuth } from '../context/AuthContext';
import { drawLine, clearCanvas, redrawCanvas, getCanvasCoordinates } from '../utils/drawingUtils';
import { DEFAULT_BRUSH_COLOR, DEFAULT_BRUSH_SIZE } from '../utils/constants';
import WhiteboardToolbar from '../components/WhiteboardToolbar';
import ChatBox from '../components/ChatBox';
import { motion } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5';

const WhiteboardPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const {
        socket,
        roomId: contextRoomId,
        drawingHistory,
        isConnected,
        joinRoom,
        leaveRoom,
        emitDrawing,
    } = useRoom();

    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const lastPoint = useRef({ x: 0, y: 0 });
    const ctx = useRef(null);

    const [brushColor, setBrushColor] = useState(DEFAULT_BRUSH_COLOR);
    const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE);
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
    const [chatMessages, setChatMessages] = useState([]);

    // Effect to initialize canvas context and handle resize
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            ctx.current = canvas.getContext('2d');
            // Set initial canvas dimensions based on its display size
            const initialWidth = canvas.clientWidth;
            const initialHeight = canvas.clientHeight;
            canvas.width = initialWidth;
            canvas.height = initialHeight;
            setCanvasDimensions({ width: initialWidth, height: initialHeight });

            const resizeCanvas = () => {
                const displayWidth = canvas.clientWidth;
                const displayHeight = canvas.clientHeight;

                if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                    canvas.width = displayWidth;
                    canvas.height = displayHeight;
                    setCanvasDimensions({ width: displayWidth, height: displayHeight });
                }
            };

            window.addEventListener('resize', resizeCanvas);

            return () => {
                window.removeEventListener('resize', resizeCanvas);
            };
        }
    }, []);

    // Effect to join room and load history when component mounts or room ID changes
    useEffect(() => {
        if (socket && roomId && currentUser) {
            if (!contextRoomId || contextRoomId !== roomId) {
                joinRoom(roomId);
            }

            socket.on('chatMessage', (messageData) => {
                setChatMessages(prevMessages => [...prevMessages, messageData]);
            });

            return () => {
                socket.off('chatMessage');
            };
        } else if (currentUser && !socket) {
            console.warn("Socket not ready yet for joining room.");
        } else if (!currentUser) {
            navigate('/login');
        }

        return () => {
            if (contextRoomId === roomId) {
                leaveRoom();
            }
        };
    }, [socket, roomId, currentUser, contextRoomId, joinRoom, leaveRoom, navigate]);

    // Effect to redraw canvas when drawingHistory updates
    useEffect(() => {
        if (ctx.current && canvasDimensions.width > 0 && canvasDimensions.height > 0) {
            redrawCanvas(ctx.current, drawingHistory);
        } else if (ctx.current && drawingHistory.length === 0) {
            clearCanvas(ctx.current, canvasDimensions.width, canvasDimensions.height);
        }
    }, [drawingHistory, canvasDimensions]);

    // Mouse event handlers for drawing
    const handleMouseDown = useCallback((e) => {
        if (!isConnected || !ctx.current) return;
        isDrawing.current = true;
        lastPoint.current = getCanvasCoordinates(canvasRef.current, e);
    }, [isConnected]);

    const handleMouseMove = useCallback((e) => {
        if (!isDrawing.current || !isConnected || !ctx.current) return;

        const currentPoint = getCanvasCoordinates(canvasRef.current, e);
        const strokeData = {
            type: 'line',
            x0: lastPoint.current.x,
            y0: lastPoint.current.y,
            x1: currentPoint.x,
            y1: currentPoint.y,
            color: brushColor,
            size: brushSize,
            username: currentUser.username,
        };

        drawLine(ctx.current, strokeData);
        emitDrawing(strokeData);

        lastPoint.current = currentPoint;
    }, [isConnected, brushColor, brushSize, currentUser, emitDrawing]);

    const handleMouseUp = useCallback(() => {
        isDrawing.current = false;
    }, []);

    const handleMouseOut = useCallback(() => {
        isDrawing.current = false;
    }, []);

    // Global Clear Canvas handler
    const handleClearCanvas = useCallback(() => {
        if (socket && contextRoomId) {
            socket.emit('clearCanvas', { roomId: contextRoomId });
        }
    }, [socket, contextRoomId]);

    // Global Undo Last Stroke handler
    const handleUndo = useCallback(() => {
        if (socket && contextRoomId) {
            socket.emit('undoLastStroke', { roomId: contextRoomId });
        }
    }, [socket, contextRoomId]);

    // Send Chat Message handler
    const handleSendMessage = useCallback((message) => {
        if (socket && contextRoomId && currentUser) {
            socket.emit('chatMessage', { roomId: contextRoomId, message, username: currentUser.username });
        }
    }, [socket, contextRoomId, currentUser]);

    const handleBackToHome = () => {
        leaveRoom();
        navigate('/home');
    };

    return (
        <motion.div
            className="flex flex-col min-h-screen bg-primary-dark p-4 relative w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Top Header Section: Back Button, Room ID, User Info */}
            <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-4 z-20">
                {/* Back Button */}
                <motion.button
                    onClick={handleBackToHome}
                    className="text-neutral-300 hover:text-secondary-DEFAULT transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-light shadow-md mb-4 sm:mb-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IoArrowBackOutline size={24} /> <span className="hidden sm:inline">Back to Home</span>
                </motion.button>

                {/* Room ID and User Info - Centered */}
                <div className="text-center flex-grow">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-accent-DEFAULT font-montserrat leading-tight mb-1">
                        Room: {roomId}
                    </h1>
                    <p className="text-neutral-400 text-sm">
                        You are: <span className="font-bold text-accent-light">{currentUser?.username || 'Guest'}</span>
                        {isConnected ? ' (Connected)' : ' (Connecting...)'}
                    </p>
                </div>

                {/* Placeholder for balancing space on right */}
                <div className="w-24 hidden sm:block"></div>
            </div>

            {/* Main Content Area: Left Toolbar, Canvas, Right Chat */}
            {/* MODIFIED: Changed height calculation to allow scrolling of the entire page if content overflows */}
            <div className="flex-grow w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr_300px] gap-4 pb-4 overflow-y-auto">
                {/* Whiteboard Toolbar (Left Sidebar) */}
                <WhiteboardToolbar
                    brushColor={brushColor}
                    setBrushColor={setBrushColor}
                    brushSize={brushSize}
                    setBrushSize={setBrushSize}
                    onClearCanvas={handleClearCanvas}
                    onUndo={handleUndo}
                    className="bg-primary-light p-4 rounded-xl shadow-lg flex flex-col gap-4 z-10 h-full w-20 md:w-24 lg:w-32"
                />

                {/* Canvas Area (Center) */}
                <motion.div
                    className="relative bg-white border-4 border-whiteboard-border rounded-lg shadow-xl overflow-hidden flex-grow min-h-[300px] md:min-h-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
                >
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseOut={handleMouseOut}
                        onTouchStart={handleMouseDown}
                        onTouchMove={handleMouseMove}
                        onTouchEnd={handleMouseUp}
                        onTouchCancel={handleMouseOut}
                    ></canvas>
                </motion.div>

                {/* Chat Box Area (Right Sidebar) */}
                <ChatBox
                    messages={chatMessages}
                    onSendMessage={handleSendMessage}
                    currentUser={currentUser}
                />
            </div>
        </motion.div>
    );
};

export default WhiteboardPage;
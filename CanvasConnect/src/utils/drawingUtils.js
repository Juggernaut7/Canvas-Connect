// client/src/utils/drawingUtils.js
// Helper functions for drawing on the canvas.

/**
 * Draws a line segment on the given canvas context.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @param {Object} stroke - The stroke data containing coordinates, color, and size.
 * @param {number} stroke.x0 - Starting X coordinate.
 * @param {number} stroke.y0 - Starting Y coordinate.
 * @param {number} stroke.x1 - Ending X coordinate.
 * @param {number} stroke.y1 - Ending Y coordinate.
 * @param {string} stroke.color - Stroke color (e.g., '#RRGGBB' or 'rgba(...)').
 * @param {number} stroke.size - Stroke width.
 */
export const drawLine = (ctx, stroke) => {
    ctx.beginPath();
    ctx.moveTo(stroke.x0, stroke.y0);
    ctx.lineTo(stroke.x1, stroke.y1);
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round'; // Makes line endings round
    ctx.globalAlpha = 1; // <--- NEW: Ensure full opacity for drawing
    ctx.stroke();
};

/**
 * Clears the entire canvas.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 */
export const clearCanvas = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
};

/**
 * Redraws the entire drawing history onto the canvas.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @param {Array<Object>} drawingHistory - An array of stroke objects.
 */
export const redrawCanvas = (ctx, drawingHistory) => {
    ctx.save();
    clearCanvas(ctx, ctx.canvas.width, ctx.canvas.height);
    drawingHistory.forEach(historyItem => {
        if (historyItem.data && historyItem.data.type === 'line') {
            drawLine(ctx, historyItem.data);
        }
    });
    ctx.restore();
};

/**
 * Converts mouse event coordinates to canvas coordinates.
 * @param {HTMLCanvasElement} canvas - The canvas DOM element.
 * @param {MouseEvent} event - The mouse event.
 * @returns {{x: number, y: number}} - Coordinates relative to the canvas.
 */
export const getCanvasCoordinates = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
};
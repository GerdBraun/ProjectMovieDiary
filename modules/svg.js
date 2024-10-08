// modules/svg.js

export function createPercentageSvg(percent) {
    const radius = 10;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - percent / 100 * circumference;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<circle class="progress-ring__circle" stroke="#999" stroke-width="4" fill="transparent" r="${radius}" cx="0" cy="0" 
    style="
        stroke-dasharray:${circumference} ${circumference};
        stroke-dashoffset:${offset};
        background-color:red
    "/>`;


    return svg;
}
// modules/svg.js

export const createPercentageSvg = (percent) => {
    const radius = 40;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - percent / 100 * circumference;

    const percentToDisplay = Math.round(percent) / 10;

    let color = '#bb3a1e';
    if (percentToDisplay > 6.5) {
        color = '#15803d'
    } else if (percentToDisplay > 4.5) {
        color = '#deb528'
    }

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('viewBox', '0 0 100 100')
    svg.innerHTML = `
    <circle class="progress-ring__circle" stroke="#ccc" stroke-width="10" fill="rgba(0,0,0,.75)" r="${radius}" cx="0" cy="0"/>
    <circle class="progress-ring__circle" stroke="${color}" stroke-width="10" fill="transparent" r="${radius}" cx="0" cy="0" 
    style="
        stroke-dasharray:${circumference} ${circumference};
        stroke-dashoffset:${offset};
    "/>
    <text x="50%" y="50%" text-anchor="middle" fill="#fff" stroke-width="2px"  font-size="30px" dy=".3em">${percentToDisplay}</text>`;


    return svg;
}
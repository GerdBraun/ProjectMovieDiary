// modules/svg.js

export function createPercentageSvg(percent) {
    const radius = 10;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - percent / 100 * circumference;

    const percentToDisplay = Math.round(percent/10);

    let color = '#bb3a1e';
    if(percentToDisplay > 6.5){
        color='#15803d'
    }else if(percentToDisplay > 4.5){
        color='#deb528'
    }

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.title = 'rating'
    svg.innerHTML = `<circle class="progress-ring__circle" stroke="${color}" stroke-width="2" fill="transparent" r="${radius}" cx="0" cy="0" 
    style="
        stroke-dasharray:${circumference} ${circumference};
        stroke-dashoffset:${offset};
        background-color:red
    "/>
    <text x="8.5" y="16" fill="${color}" font-size=".75rem">${percentToDisplay}</text>`;


    return svg;
}
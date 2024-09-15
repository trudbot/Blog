import QuickChart from 'quickchart-js';
import {dark, light} from '../assets/colorSystem';
export async function pie_base64(
    labels: string[],
    data: number[],
) {
    const chart = new QuickChart();
    chart.setHeight(500).setBackgroundColor('transparent');;
    chart.setConfig({
        type: 'pie',
        data: {
            labels,
            datasets: [{
                label: 'Programming Languages',
                data,
                backgroundColor: [...dark, ...light].splice(0, labels.length)
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Code Language Statistics for Blogs'
            }
        }
    });
    return await chart.toDataUrl();
}


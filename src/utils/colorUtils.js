export function codeToHEX() {

    var code = localStorage.color;

    if (code === 'danger') {
        return '#212121';
    } else if (code === 'warning') {
        return '#ff9800';
    } else if (code === 'success') {
        return '#ffa1f0';
    } else if (code === 'primary') {
        return '#4caf50';
    } else if (code === 'info') {
        return '#00d3ee';
    } else if (code === 'general') {
        return '#2196F3';
    } else if (code === 'tertiary') {
        return '#9E9E9E';
    } else if (code === 'error') {
        return '#F44336';
    }
    return '#00d3ee';

}
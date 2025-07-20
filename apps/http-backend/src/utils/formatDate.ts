export function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs/1000);
    const diffMin = Math.floor(diffSec/60);
    const diffHr = Math.floor(diffMin/60);
    const diffDay = Math.floor(diffHr/24);

    //If today
    if(now.toDateString() === date.toDateString()){
        if(diffHr>=1){
            return `${diffHr} hr${diffHr>1 ? 's': ''} ago`;
        }
        else if(diffMin>=1){
            return `${diffMin} min${diffMin>1 ? 's' : ''} ago`
        }
        else {
            return 'Now';
        }
    }

    //If yesterday
    if(diffDay==1){
        return 'Yesterday';
    }

    //If this week
    if(diffDay<=7){
        return date.toLocaleDateString('en-US', {weekday: 'short'});
    }

    //If this year
    if(now.getFullYear()===date.getFullYear()){
        return date.toLocaleDateString('en-US', {day: '2-digit', month: 'short'});
    }

    //Else return date
    return date.toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'})
}
export const formetTime  = (time)=>{
    const hours = new Date(time).getHours();
    const minutes = new Date(time).getMinutes();

    return `${hours < 10 ? '0' + hours : hours}:${minutes <10 ? '0' + minutes : minutes} ${hours > 12 ? 'PM' : 'AM'}`
}
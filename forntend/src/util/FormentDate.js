export const FromentDate = (currentDate) =>{

    console.log(currentDate);



    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();

    const dateObject = new Date('01/06/2024');
    
    console.log(dateObject.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      }));  

      console.log(`${month}/${day}/${year}`);

    return `${month}/${day}/${year}`;
}

export const normalDateToLocalStringForment = (date)=>{
    const dateObject = new Date(date);

    console.log(dateObject.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      }));

    // Format the date as "Wed Jan 17 2024 00:00:00"
    return dateObject.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    });
}



export const compareToCurrDate =async (date)=>{
    const currentDate = new Date();
          let eventDateArr = date.split("/");
          eventDateArr[1] = parseInt(eventDateArr[1]) + 1;
          const eventDate = new Date(
            `${eventDateArr[0]}/${eventDateArr[1]}/${eventDateArr[2]}`
          ); // December 31, 2023 (month is 0-based, so 11 is December)
          if (currentDate >= eventDate) {
            return true;
          } else{
            return false;
          }
}
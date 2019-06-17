function notify(message) {
    const notificationId= document.getElementById(`notification`);
    notificationId.textContent=message;
    notificationId.style.display=`block`;
    setTimeout(() => {
       notificationId.style.display=`none`;
    }, 2000);
}
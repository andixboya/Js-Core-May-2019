class Hotel {
    constructor(name, capacity) {
        this.name = name,
        this.capacity = capacity
        this.bookings = [],
        this.currentBookingNumber = 1

        //TODO: said here that they want only integers, does this mean to floor or.. int?
        this._singleRoomCapacity = Math.floor(capacity * 0.5);
        this._doubleRoomCapacity = Math.floor(capacity * 0.3);
        this._maisonetteRoomCapacity = Math.floor(capacity * 0.2),

        this.typeOfRooms = [`single`, `double`, `maisonette`]
    }

    get singleRoomCapacity() {
        return this._singleRoomCapacity;
    }

    set singleRoomCapacity(value) {
        this._singleRoomCapacity += value;
    }

    get doubleRoomCapacity() {
        return this._doubleRoomCapacity;
    }
    set doubleRoomCapacity(value) {
        this._doubleRoomCapacity += value;
    }


    get maisonetteRoomCapacity() {
        return this._maisonetteRoomCapacity
    }
    set maisonetteRoomCapacity(value) {
        this._maisonetteRoomCapacity += value;
    }


    get roomsPricing() {
        return {
            single: 50,
            double: 90,
            maisonette: 135
        }
    }

    get servicesPricing() {
        return {
            food: 10,
            drink: 15,
            housekeeping: 25
        }
    }


    checkForAvailableRooms(typeOfRoom) {

        //here changed it to single, so it would match the rest! 
        if (typeOfRoom.startsWith(`single`)) {
            return this._singleRoomCapacity > 0;
        } else if (typeOfRoom.startsWith(`double`)) {
            return this._doubleRoomCapacity > 0;
        } else { // in case of maisonette
            return this._maisonetteRoomCapacity > 0;
        }
    }

    //here also, because of the checker some tests were down!
    rentARoom(clientName, roomType, nights) {

        nights = Number(nights);
        const bookingNumber = this.currentBookingNumber;

        let message;
        if (this.checkForAvailableRooms(roomType)) {
            const room = {
                bookingNumber,
                clientName,
                roomType,
                nights,

            }

            message = `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber}.`
            this.bookings.push(room);
            //TODO: not sure if this works... tho..

            this[`_${roomType}RoomCapacity`] -= 1;
            this.currentBookingNumber++;
            return message
        }

        message = `No ${roomType} rooms available!`;


        for (const room of this.typeOfRooms) {
            if (room === roomType) {
                continue;
            } else {
                //CHECK HERE, if this validaiton is necessary? YES it is!
                if (this.checkForAvailableRooms(room)) {
                    message += ` `;
                    const availableRooms = this[`${room}RoomCapacity`];
                    message += `Available ${room} rooms: ${availableRooms}.`
                }
            }

        }

        return message;
    }

    // here because of 1 , all 3-4 tests were down! 
    roomService(currentBookingNumber, serviceType) {

        let message;
        const validServices = Object.keys(this.servicesPricing);
        const bookedRoom = this.bookings.find(r => r.bookingNumber === currentBookingNumber)
        //here by the validation method, i was inserting wrong params, and didn`t even bother to check what the result was... , again dumb.
        if (bookedRoom === undefined) {
            message = `The booking ${currentBookingNumber} is invalid.`;
        } else if (!validServices.includes(serviceType)) {
            message = `We do not offer ${serviceType} service.`
        } else {
            message = `Mr./Mrs. ${bookedRoom.clientName}, Your order for ${serviceType} service has been successful.`

            if (bookedRoom.services === undefined) {
                bookedRoom.services = [];
            }
            bookedRoom.services.push(serviceType);
        }

        return message;

    }
    //this was error-free i think
    checkOut(currentBookingNumber) {
        const bookedRoom = this.bookings.find(r => r.bookingNumber === currentBookingNumber)

        let message;
        if (bookedRoom) {
            const typeOfRoom = bookedRoom.roomType;
            const pricePerNight = this.roomsPricing[typeOfRoom];
            const totalMoneyOwned = pricePerNight * Number(bookedRoom.nights);
            const indexOfRoom = this.bookings.findIndex(r => r.bookingNumber === currentBookingNumber);

            //add capacity
            this[`_${typeOfRoom}RoomCapacity`] += 1;
            //remove the room from the array
            this.bookings.splice(indexOfRoom, 1);

            message = `We hope you enjoyed your time here, Mr./Mrs. ${bookedRoom.clientName}. The total amount of money you have to pay is ${totalMoneyOwned} BGN.`

            if (bookedRoom.services) {
                const typesOfServices = bookedRoom.services;
                let servicesTotalCost = 0;

                typesOfServices.forEach(s => {

                    const currentServicePrice = Number(this.servicesPricing[s]);
                    servicesTotalCost += currentServicePrice;
                })
                const total = servicesTotalCost + totalMoneyOwned;
                message = `We hope you enjoyed your time here, Mr./Mrs. ${bookedRoom.clientName}. The total amount of money you have to pay is ${total} BGN. You have used additional room services, costing ${servicesTotalCost} BGN.`
            }
        } else {
            message = `The booking ${currentBookingNumber} is invalid.`;
        }

        return message;

    }
    report() {

        let message = ``;
        message += `${this.name.toUpperCase()} DATABASE:\n`
        message += `--------------------\n`;

        if (this.bookings.length > 0) {
            const allBookings = this.bookings;

            for (const booking in allBookings) {

                const kvps = Object.entries(allBookings[booking])
                for (const kvp of kvps) {

                    if (kvp[0] === `services`) {
                        message += `${kvp[0]}: ${kvp[1].join(`, `)}\n`
                    } else {
                        message += `${kvp[0]} - ${kvp[1]}\n`;
                    }
                }

                if (Number(booking) !== allBookings.length - 1) {
                    message += `----------\n`;
                }


            }

        } else {
            //here mistake , rewritten, instead of concatenating..., pretty dumb. 
            message += `There are currently no bookings.`;
        }

        //here in the trim 
        message = message.trim();
        return message;
    }
}
// let hotel = new Hotel('HotUni', 10);

// hotel.rentARoom('Peter', 'single', 4);

// hotel.rentARoom('Pesho', 'maisonette', 6);
// console.log(hotel.rentARoom('Lelq', 'maisonette', 6));
// console.log(hotel.rentARoom('Geroge', 'maisonette', 6));

// hotel.roomService(1, 'drink');
// hotel.roomService(1, 'drink');
// hotel.roomService(2, 'room');
// console.log(hotel.checkOut(1));

// console.log(hotel.report());


// console.log(hotel.checkOut(2));

// // console.log(hotel.bookings);
// console.log(hotel.singleRoomCapacity);
// console.log(hotel.doubleRoomCapacity);
// console.log(hotel.maisonetteRoomCapacity);

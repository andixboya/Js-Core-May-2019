function sortTickets(arr, sortCriteria) {

    let tickets = [];

    const sortingCriterias = {
        destination: `destination`,
        price: `price`,
        status: `status`
    }
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination
            this.price = price,
            this.status = status
        }


    }

    for (const line of arr) {

        let [destination, price, status] = line.split(`|`);
        price = Number(price);
        const currentTicket = new Ticket(destination, price, status);
        tickets.push(currentTicket);
    }


    let criteria = sortingCriterias[sortCriteria];

    if (criteria === `price`) {
        tickets.sort((a, b) => a.price - b.price);

    } else {
        tickets.sort((a, b) => a[`${criteria}`].localeCompare(b[`${criteria}`]));
    }

    // console.log(tickets);
    return tickets;
}
// sortTickets(
//     ['Philadelphia|94.20|available',
//  'New York City|95.99|available',
//  'New York City|95.99|sold',
//  'Boston|126.20|departed'],
// 'status'
// )
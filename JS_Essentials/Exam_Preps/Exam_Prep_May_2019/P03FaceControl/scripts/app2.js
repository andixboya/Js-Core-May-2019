function getData() {


	const textAreaInput = document.querySelector(`#input textarea`);

	let objectCollection = JSON.parse(textAreaInput.value);
	const lastObj = objectCollection.pop();

	const peopleInParagraph = document.querySelector(`#peopleIn>p`);
	const peopleOutParagraph = document.querySelector(`#peopleOut>p`);
	const blackListParagraph = document.querySelector(`#blacklist>p`);

	let listOfInPeople = [];
	let listOfOutPeople = [];
	let blackListPeople = [];


	//firstName / LastName / action (props)
	for (let obj of objectCollection) {

		const command = obj.action;

		const names = {
			firstName: obj.firstName,
			lastName: obj.lastName
		}

		switch (command) {
			case `peopleIn`:
				peopleIn(names);
				break;

			case `peopleOut`:
				peopleOut(names);
				break;

			case "blacklist":
				blacklist(names);
				break;
		}
	}

	const criteria = lastObj.criteria;
	const action = lastObj.action;


	const validCriteria = [`firstName`, `lastName`];
	const validActions = [`peopleIn`, `peopleOut`, `blacklist`];

	if (validCriteria.includes(criteria) && validActions.includes(action)) {
		let wantedList;
		let wantedPar;
		switch (action) {
			case `peopleIn`:
				wantedList = listOfInPeople
				wantedPar=peopleInParagraph;
				break;

			case `peopleOut`:
				wantedList = listOfOutPeople;
				wantedPar=peopleOutParagraph;
				break;
			case `blacklist`:
				wantedList = blackListPeople
				wantedPar=blackListParagraph;
				break;

		}

		
		wantedList= wantedList.sort((a, b) => (a[criteria]).localeCompare(b[criteria]));

		const message = wantedList.map(o => JSON.stringify(o)).join(` `);

		wantedPar.textContent = message;
	}


	function peopleIn(name) {

		const currentFirstName = name.firstName;
		const currentLastName = name.lastName;

		
		let objFromBlackList = blackListPeople
			.find(o => o.firstName === currentFirstName &&
				o.lastName === currentLastName);

		let objFromInList = listOfInPeople
			.find(o => o.firstName === currentFirstName &&
				o.lastName === currentLastName);


		if (objFromBlackList === undefined && objFromInList === undefined) {

			listOfInPeople.push(name);
			peopleInParagraph.textContent = listOfInPeople.map(o => JSON.stringify(o)).join(` `);
		}

	}
	function peopleOut(name) {

		const currentFirstName = name.firstName;
		const currentLastName = name.lastName;

		let objFromInList = listOfInPeople
			.find(o => o.firstName === currentFirstName &&
				o.lastName === currentLastName);
		// let objFromOutList = listOfOutPeople
		// 	.find(o => o.firstName === currentFirstName &&
		// 		o.lastName === currentLastName);


		if (objFromInList) {
			listOfInPeople = listOfInPeople.filter(o => o !== objFromInList);
			listOfOutPeople.push(name);
		}


		



		peopleOutParagraph.textContent = listOfOutPeople.map(o => JSON.stringify(o)).join(` `);
		peopleInParagraph.textContent = listOfInPeople.map(o => JSON.stringify(o)).join(` `);

	}

	function blacklist(name) {
		const currentFirstName = name.firstName;
		const currentLastName = name.lastName;
// debugger
		let objFromInList = listOfInPeople
			.find(o => o.firstName === currentFirstName &&
				o.lastName === currentLastName);
		let objFromOutList = listOfOutPeople
			.find(o => o.firstName === currentFirstName &&
				o.lastName === currentLastName);

		let objFromBlackList = blackListPeople
			.find(o => o.firstName === currentFirstName &&
				o.lastName === currentLastName);


		if (objFromInList) {
			listOfInPeople = listOfInPeople.filter(o => o !== objFromInList)

			if (objFromOutList === undefined) {
				listOfOutPeople.push(name);
			}


		}

		if (objFromBlackList === undefined) {
			blackListPeople.push(name);
		}


		blackListParagraph.textContent = blackListPeople.map(o => JSON.stringify(o)).join(` `);;
		peopleInParagraph.textContent = listOfInPeople.map(o => JSON.stringify(o)).join(` `);
		peopleOutParagraph.textContent = listOfOutPeople.map(o => JSON.stringify(o)).join(` `);
	}


	//peopleIn()
	//peopleOut()
	//blacklist()
	//last is criteria/action
}
function getData() {


	const textAreaInput = document.querySelector(`#input textarea`);

	let objectCollection = JSON.parse(textAreaInput.value);
	const lastObj = objectCollection.pop();

	const peopleInParagraph = document.querySelector(`#peopleIn>p`);
	const peopleOutParagraph = document.querySelector(`#peopleOut>p`);
	const blackListParagraph = document.querySelector(`#blacklist>p`);



	//firstName / LastName / action (props)
	for (let obj of objectCollection) {

		const command = obj.action;
		const objAsString = `{"firstName":"${obj.firstName}","lastName":"${obj.lastName}"}`;

		switch (command) {
			case `peopleIn`:
				peopleIn(objAsString);
				break;

			case `peopleOut`:
				peopleOut(objAsString);
				break;

			case "blacklist":
				blacklist(objAsString);
				break;
		}
	}

	const criteria = lastObj.criteria;
	const action = lastObj.action;


	if (criteria && action) {
		const wantedList = document.querySelector(`#${action}>p`)
		let listOfObjects = wantedList.textContent
            .split(` `)
            .filter(o=> o)
			.map(o => JSON.parse(o));

		listOfObjects = listOfObjects.sort((a, b) => (a[criteria]).localeCompare(b[criteria]));



		const message = listOfObjects.map(o => JSON.stringify(o)).join(` `);

		wantedList.textContent = message;
	}


	function peopleIn(name) {
		let peopleList = peopleInParagraph.textContent
			.split(` `)
			.filter(o => o);
		let blackList = blackListParagraph.textContent
			.split(` `)
			.filter(o => o);

		if (!blackList.includes(name) && !peopleList.includes(name)) {
			peopleList.push(name);
			peopleInParagraph.textContent = peopleList.join(` `);
		}
	}
	function peopleOut(name) {
		let outPeopleList = peopleOutParagraph.textContent
            .split(` `)
            .filter(o=> o)
		let peopleList = peopleInParagraph.textContent
            .split(` `)
            .filter(o=> o)


		const indexOfName = peopleList.indexOf(name);
		if (indexOfName !== -1) {
            peopleList.splice(indexOfName, 1);
            outPeopleList.push(name);
		}

		peopleOutParagraph.textContent = outPeopleList.join(` `);
		peopleInParagraph.textContent = peopleList.join(` `);

	}

	function blacklist(name) {
		let blackList = blackListParagraph.textContent
			.split(` `)
			.filter(o => o);
		let peopleInList = peopleInParagraph.textContent
			.split(` `)
			.filter(o => o);
		let peopleOutList = peopleOutParagraph.textContent
            .split(` `)
            .filter(o=> o)
            

		const indexOfName = peopleInList.indexOf(name);

		if (indexOfName !== -1) {
			peopleInList.splice(indexOfName, 1);
			peopleOutList.push(name);
		}
		if (!blackList.includes(name)) {
			blackList.push(name);
		}

		blackListParagraph.textContent = blackList.join(` `);
		peopleInParagraph.textContent = peopleInList.join(` `);
		peopleOutParagraph.textContent = peopleOutList.join(` `);
	}

}
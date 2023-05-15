const errorElement = `
<div style="padding: 20px;">
	<img width='80' height='80' src='no-results.png' alt='No results found!'/>
</div>
<span>No results found!</span>
`;

function previousButtonAction() {
	const getIds = window.searchResults.map((s) => s.id)
	const currentIndex = getIds.indexOf(window.currItem.id)
	updateSearchResult(window.searchResults[currentIndex - 1])
}

function nextButtonAction() {
	const getIds = window.searchResults.map((s) => s.id)
	const resultIdx = getIds.indexOf(window.currItem.id)
	updateSearchResult(window.searchResults[resultIdx + 1])
}

function updateSearchResult(results) {
	window.currItem = results;
	showResumeAndHideResults();
	renderApplicantInfo(results);
}

function showResumeAndHideResults() {
	document.getElementById('search-result-div').style.display = 'none'
	document.getElementById('show-resume').style.display = 'block'
}

function getResumeHeader(name, position) {
	let applicantNameField = document.getElementById('name')
	let appliedForField = document.getElementById('appliedFor')
	applicantNameField.innerText = name;
	appliedForField.innerText = position;
}

function getApplicantInfo(basics) {
	let phoneNumber = document.getElementById('phonenumber');
	let emailId = document.getElementById('email');
	let linkedin = document.getElementById('linkedin');

	phoneNumber.innerText = basics.phone;
	emailId.innerText = basics.email;

	linkedin.innerHTML = '';
	let linkedInField = document.createElement('a');
	linkedInField.innerText = 'Linkedin';
	linkedInField.href = basics.profiles.url;
	linkedin.appendChild(linkedInField);
}

function getTechnicalSkills(keywords) {
	let techSkills = document.getElementById('techskills')
	techSkills.innerHTML = ''
	keywords.forEach(k => {
		techSkills.appendChild(document.createTextNode(k));
		techSkills.appendChild(document.createElement('br'));
	})
}

function getHobbies(hobbies) {
	let hobbiesNode = document.getElementById('hobbies')
	hobbiesNode.innerHTML = ''
	hobbies.forEach(h => {
		hobbiesNode.appendChild(document.createTextNode(h));
		hobbiesNode.appendChild(document.createElement('br'));
	})
}

function getCompanyDetails(companyInfo) {
	let companyName = document.getElementById('companyname');
	companyName.innerText = companyInfo['Company Name'];

	let position = document.getElementById('position');
	position.innerText = companyInfo.Position;
	
	let startDate = document.getElementById('startdate')
	startDate.innerText = companyInfo['Start Date']
	
	let endDate = document.getElementById('enddate');
	endDate.innerText = companyInfo['End Date'];
	
	let summary = document.getElementById('summary')
	summary.innerText = companyInfo.Summary
}

function getProjectDetails(project) {
	let projectField = document.getElementById('project');
	projectField.innerHTML = "";
	let projectName = project.name;
	let projectDescription = project.description;
	let projectNameField = document.createElement('b');
	projectField.innerText = projectName + ': ';
	let projectDescField = document.createElement('span');
	projectDescField.innerText = projectDescription;
	projectField.appendChild(projectNameField);
	projectField.appendChild(projectDescField);
}

function getEducationDetails(education) {
	let ugField = document.getElementById('ug')
	let seniorSecondaryField = document.getElementById('seniorsecondary')
	let highScoolField = document.getElementById('highschool')

	ugField.innerText = `${education.UG.institute}, ${education.UG.course}, ${education.UG['Start Date']}, ${education.UG['End Date']}, ${education.UG.cgpa}`
	seniorSecondaryField.innerText = `${education['Senior Secondary'].institute}, ${education['Senior Secondary'].cgpa}`
	highScoolField.innerText = `${education['High School'].institute}, ${education['High School'].cgpa}`
}

function getInternshipDetails(internship) {
	let internshipNameField = document.getElementById('internshipname')
	let internshipPositionField = document.getElementById('internshipposition')
	let internshipStartDateField = document.getElementById('internshipstartdate')
	let internshipEndDateField = document.getElementById('internshipenddate')
	let internshipSummaryField = document.getElementById('internshipsummary')

	internshipNameField.innerText = internship['Company Name']
	internshipPositionField.innerText = internship.Position
	internshipStartDateField.innerText = internship['Start Date']
	internshipEndDateField.innerText = internship['End Date']
	internshipSummaryField.innerText = internship.Summary
}

function getAchievementsDetails(achievementsInfo) {
	let achievementListField = document.getElementById('achievements')
	achievementListField.innerHTML = ''
	achievementsInfo.forEach(a => {
		let achivementList = document.createElement('li')
		achivementList.innerText = a
		achievementListField.appendChild(achivementList);
	})
}

function disableNavButtons(resultSet) {
	const getIds = window.searchResults.map((s) => s.id);
	const resultIdx = getIds.indexOf(resultSet.id);
	document.getElementById('prev-btn').disabled = resultIdx === 0;
	document.getElementById('next-btn').disabled = resultIdx === getIds.length-1;
}

function renderAfterSearch(){
	let searchValue = document.getElementById('searchbox').value;
	if (searchValue.length === 0) {
		window.currItem = data.resume[0]
		window.searchResults = data.resume
		updateSearchResult(data.resume[0])
		return
	}
	let searchResults = search(searchValue);
	window.searchResults = searchResults;
	let listDiv = document.getElementById('search-results');
	listDiv.innerHTML = "";
	if(searchResults.length === 0) {
		listDiv.innerHTML = errorElement;
		document.querySelector('.resume').classList.add('hidden');
	}
	showResultsAndHideResume();
	searchResults.map(s => {
		let elem = document.createElement("li");
		elem.appendChild(addSearchResultLink(s))
		listDiv.appendChild(elem);
	})
}

function search(value) {
    return data.resume.filter((n) => n.basics.AppliedFor.toLowerCase().startsWith(value.toLowerCase()));
}

function showResultsAndHideResume() {
	document.getElementById('search-result-div').style.display = 'block';
	document.getElementById('show-resume').style.display = 'none';
}

function addSearchResultLink(results) {
	let elementToAdd = document.createElement('a');
	elementToAdd.innerText = results.basics.name;
	elementToAdd.setAttribute('href', '#');
	elementToAdd.addEventListener('click', () => updateSearchResult(results));
	document.querySelector('.resume').classList.remove('hidden');
	elementToAdd.setAttribute('data', `result: ${results}`);
	return elementToAdd;
}	

function renderApplicantInfo(results) {
	getResumeHeader(results.basics.name, results.basics.AppliedFor);
	getApplicantInfo(results.basics);
	getTechnicalSkills(results.skills.keywords);
	getHobbies(results.interests.hobbies);
	getCompanyDetails(results.work);
	getProjectDetails(results.projects);
	getEducationDetails(results.education);
	getInternshipDetails(results.Internship);
	getAchievementsDetails(results.achievements.Summary);
	disableNavButtons(results);
}

window.searchResults = data.resume;
window.currItem = data.resume[0];
updateSearchResult(data.resume[0]);

var searchField = document.getElementById('searchbox');
searchField.addEventListener('keypress',function(event){
	if(event.key == "Enter"){
		document.querySelector('.resume').classList.remove('hidden');
		updateSearchResult(data.resume[0]);
	}
});
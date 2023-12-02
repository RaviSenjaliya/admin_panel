const storedData = JSON.parse(localStorage.getItem('facultyData'));
console.log('=====>', storedData);

let displayName = 'User Name';

if (storedData && storedData.firstName && storedData.lastName) {
  displayName = storedData.firstName + ' ' + storedData.lastName;
}

const account = {
  displayName: displayName,
  photoURL: '/assets/images/avatars/avatar_18.jpg',
};

export default account;

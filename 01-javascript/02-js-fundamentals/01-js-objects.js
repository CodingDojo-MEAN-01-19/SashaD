let students = [
    {name: 'Remy', cohort: 'Jan'},
    {name: 'Genevieve', cohort: 'March'},
    {name: 'Chuck', cohort: 'Jan'},
    {name: 'Osmund', cohort: 'June'},
    {name: 'Nikki', cohort: 'June'},
    {name: 'Boris', cohort: 'June'}
];

for(var index = 0; index < students.length; index++){
    console.log('Name: ' + students[index].name + ', Cohort: ' + students[index].cohort)
}



let users = {
    employees: [
        {'first_name':  'Miguel', 'last_name' : 'Jones'},
        {'first_name' : 'Ernie', 'last_name' : 'Bertson'},
        {'first_name' : 'Nora', 'last_name' : 'Lu'},
        {'first_name' : 'Sally', 'last_name' : 'Barkyoumb'}
    ],
    managers: [
       {'first_name' : 'Lillian', 'last_name' : 'Chambers'},
       {'first_name' : 'Gordon', 'last_name' : 'Poe'}
    ]
 };

 console.log('Employees')
 console.log(users.employees[0]['first_name'])
 console.log(users.employees[0]['first_name'].length)
for(var i = 0; i < users.employees.length; i++){
    console.log((i+1) + ' - ' + users.employees[i]['last_name'] + ', ' + users.employees[i]['first_name'] + ' - ' + (users.employees[i]['first_name'].length + users.employees[i]['last_name'].length))
}
console.log('Managers')
for(var i = 0; i < users.managers.length; i++){
    console.log((i+1) + ' - ' + users.managers[i]['last_name'] + ', ' + users.managers[i]['first_name'] + ' - ' + (users.employees[i]['first_name'].length + users.employees[i]['last_name'].length))
}
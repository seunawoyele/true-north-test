# true-north-test
test for Sr nodeJs developers, part 1, api creation

<b>Part 1 - Api creation</b>
- Develop a Rest API for restaurant/delivery, each restaurant should follow the following
data structure:
<pre>
{
id : any
logo : text (url)
commercialName : text
legalName : text
rating : (float max 5 min 1)
reviews : [
{
name : text
review : text
rating : number
}
]
meals : [
{
name : text
description : text
price : float
}
]
commercialEmail : text
adminNumber : text
address : text
Location : latLng
}
</pre>

<ul>
<li> Provide endpoints to delete, list (with the possibility of filter by rating), edit information</li>
<li> Provide endpoint to rate each restaurant (the total rate of the place should be an
average of all user ratings)</li>
<li>Provide a endpoint to create a order, should have one or more meals​, total​ ​cost,​
address​ and a latLng​ position of the place, this endpoint should save the order on a
different table/document and return ETA (estimated time of arrival) based on user
location and restaurant location (transport media being a motorcycle), this time should
have in count traffic at the moment, also when a order is triggered a message needs to
be created and queue in ActiveMQ server 1 message for the notification and another for
the order</li>
</ul>

<h1> Stack </h1>
<ul>
<li> NodeJS , you can use express or any framework you like </li>
<li> Postgress DB is desired but you can use any you feel more useful for the exercise </li>
<li> You can use google maps or any API or any you feel more convenient </li>
<li> ActiveMQ </li>


var APIkey = "EC8C8CC2-1DE3-0C40-BCB3-11EB92ABB8BF704AED47-6AD2-4298-867B-307AA0AE0752";

var characterOrder = ["Follower Of kOrMIR","Jarod Windfury","Illidan Windfury","Haidene Windfury"];



function reorderCharacters(data){
	console.log('reordering characters',characterOrder);
	var newOrder = [];
	//var names = [];
	
	/*for(i=0;i<data.length;i++)
	{
		names.push(data[i].name);
	}
	console.log(names);*/
	for(i=0;i<characterOrder.length;i++)
	{
		for(y=0;y<data.length;y++)
		{
			if(characterOrder[i].toLowerCase() == data[y].name.toLowerCase())
			{
				newOrder.push(data[y]);
				data.splice(y,1);
			}
		}
		
	}
	while(data.length>0)
	{
		newOrder.push(data[0]);
		data.splice(0,1);
	}
	return newOrder;
}
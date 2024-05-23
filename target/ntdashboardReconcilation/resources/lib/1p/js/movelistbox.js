function hasOptions(obj) 
{
	if (obj!=null && obj.options!=null) 
	{
	 return true; 
	}
	return false;
}

function selectAllOptions(obj) 
{
	if (!hasOptions(obj)) 
	{
		 return;
	}
	for (var i=0; i<obj.options.length; i++)
	{
		obj.options[i].selected = true;
	}
}

function moveSelectedOptions(fromId,toId) 
{
	// Move them over
	var from = document.getElementById(fromId);
	var to = document.getElementById(toId);
	if (!hasOptions(from)) 
	{ 
		return;
	}
	var isSelected = false;
	for (var i=0; i<from.options.length; i++)
	{
		var o = from.options[i];
		if (o.selected) 
		{
			isSelected = true;
			if (!hasOptions(to)) 
			{  
			  var index = 0; 
			} 
			else
			{ 
			  var index=to.options.length; 
			}
			to.options[index] = new Option( o.text, o.value, false, false);

		}
	}
	if(!isSelected)
	{
		alert("Select atleast one item");
			
	}
	// Delete them from original
	for (var i=(from.options.length-1); i>=0; i--)
	{
		var o = from.options[i];
		if (o.selected) 
		{
			from.options[i] = null;
		}
	}

	from.selectedIndex = -1;
	to.selectedIndex = -1;
}

function moveAllOptions(fromId,toId) 
{
	var from = document.getElementById(fromId);
	var to = document.getElementById(toId);
	selectAllOptions(from);
	moveSelectedOptions(fromId,toId);
}

function topAction(obj) { /*updated from version 1.2*/
	obj = (typeof obj == "string") ? document.getElementById(obj) : obj;
	if (obj.tagName.toLowerCase() != "select" && obj.length < 2)
		return false;
	var elements = new Array();
	for (var i=0; i<obj.length; i++) {
		if (obj[i].selected) {
			elements[elements.length] = new Array((document.body.innerHTML ? obj[i].innerHTML : obj[i].text), obj[i].value, obj[i].style.color, obj[i].style.backgroundColor, obj[i].className, obj[i].id, obj[i].selected);
		}
	}
	for (i=0; i<obj.length; i++) {
		if (!obj[i].selected) {
			elements[elements.length] = new Array((document.body.innerHTML ? obj[i].innerHTML : obj[i].text), obj[i].value, obj[i].style.color, obj[i].style.backgroundColor, obj[i].className, obj[i].id, obj[i].selected);
		}
	}
	for (i=0; i<obj.length; i++) {
		if (document.body.innerHTML) obj[i].innerHTML = elements[i][0];
		else obj[i].text = elements[i][0];
		obj[i].value = elements[i][1];
		obj[i].style.color = elements[i][2];
		obj[i].style.backgroundColor = elements[i][3];
		obj[i].className = elements[i][4];
		obj[i].id = elements[i][5];
		obj[i].selected = elements[i][6];
	}
}

function bottomAction(obj) { /*updated from version 1.2*/
	obj = (typeof obj == "string") ? document.getElementById(obj) : obj;
	if (obj.tagName.toLowerCase() != "select" && obj.length < 2)
		return false;
	var elements = new Array();
	for (var i=0; i<obj.length; i++) {
		if (!obj[i].selected) {
			elements[elements.length] = new Array((document.body.innerHTML ? obj[i].innerHTML : obj[i].text), obj[i].value, obj[i].style.color, obj[i].style.backgroundColor, obj[i].className, obj[i].id, obj[i].selected);
		}
	}
	for (i=0; i<obj.length; i++) {
		if (obj[i].selected) {
			elements[elements.length] = new Array((document.body.innerHTML ? obj[i].innerHTML : obj[i].text), obj[i].value, obj[i].style.color, obj[i].style.backgroundColor, obj[i].className, obj[i].id, obj[i].selected);
		}
	}
	for (i=obj.length-1; i>-1; i--) {
		if (document.body.innerHTML) obj[i].innerHTML = elements[i][0];
		else obj[i].text = elements[i][0];
		obj[i].value = elements[i][1];
		obj[i].style.color = elements[i][2];
		obj[i].style.backgroundColor = elements[i][3];
		obj[i].className = elements[i][4];
		obj[i].id = elements[i][5];
		obj[i].selected = elements[i][6];
	}
}

function upAction(obj) { /*updated from version 1.2*/
	obj = (typeof obj == "string") ? document.getElementById(obj) : obj;
	if (obj.tagName.toLowerCase() != "select" && obj.length < 2)
		return false;
	var sel = new Array();
	for (var i=0; i<obj.length; i++) {
		if (obj[i].selected == true) {
			sel[sel.length] = i;
		}
	}
	for (i in sel) {
		if (sel[i] != 0 && !obj[sel[i]-1].selected) {
			var tmp = new Array((document.body.innerHTML ? obj[sel[i]-1].innerHTML : obj[sel[i]-1].text), obj[sel[i]-1].value, obj[sel[i]-1].style.color, obj[sel[i]-1].style.backgroundColor, obj[sel[i]-1].className, obj[sel[i]-1].id);
			if (document.body.innerHTML) obj[sel[i]-1].innerHTML = obj[sel[i]].innerHTML;
			else obj[sel[i]-1].text = obj[sel[i]].text;
			obj[sel[i]-1].value = obj[sel[i]].value;
			obj[sel[i]-1].style.color = obj[sel[i]].style.color;
			obj[sel[i]-1].style.backgroundColor = obj[sel[i]].style.backgroundColor;
			obj[sel[i]-1].className = obj[sel[i]].className;
			obj[sel[i]-1].id = obj[sel[i]].id;
			if (document.body.innerHTML) obj[sel[i]].innerHTML = tmp[0];
			else obj[sel[i]].text = tmp[0];
			obj[sel[i]].value = tmp[1];
			obj[sel[i]].style.color = tmp[2];
			obj[sel[i]].style.backgroundColor = tmp[3];
			obj[sel[i]].className = tmp[4];
			obj[sel[i]].id = tmp[5];
			obj[sel[i]-1].selected = true;
			obj[sel[i]].selected = false;
		}
	}
}

function downAction(obj) {
	obj = (typeof obj == "string") ? document.getElementById(obj) : obj;
	if (obj.tagName.toLowerCase() != "select" && obj.length < 2)
		return false;
	var sel = new Array();
	for (var i=obj.length-1; i>-1; i--) {
		if (obj[i].selected == true) {
			sel[sel.length] = i;
		}
	}
	for (i in sel) {
		if (sel[i] != obj.length-1 && !obj[sel[i]+1].selected) {
			var tmp = new Array((document.body.innerHTML ? obj[sel[i]+1].innerHTML : obj[sel[i]+1].text), obj[sel[i]+1].value, obj[sel[i]+1].style.color, obj[sel[i]+1].style.backgroundColor, obj[sel[i]+1].className, obj[sel[i]+1].id);
			if (document.body.innerHTML) obj[sel[i]+1].innerHTML = obj[sel[i]].innerHTML;
			else obj[sel[i]+1].text = obj[sel[i]].text;
			obj[sel[i]+1].value = obj[sel[i]].value;
			obj[sel[i]+1].style.color = obj[sel[i]].style.color;
			obj[sel[i]+1].style.backgroundColor = obj[sel[i]].style.backgroundColor;
			obj[sel[i]+1].className = obj[sel[i]].className;
			obj[sel[i]+1].id = obj[sel[i]].id;
			if (document.body.innerHTML) obj[sel[i]].innerHTML = tmp[0];
			else obj[sel[i]].text = tmp[0];
			obj[sel[i]].value = tmp[1];
			obj[sel[i]].style.color = tmp[2];
			obj[sel[i]].style.backgroundColor = tmp[3];
			obj[sel[i]].className = tmp[4];
			obj[sel[i]].id = tmp[5];
			obj[sel[i]+1].selected = true;
			obj[sel[i]].selected = false;
		}
	}
}

function inarray(v,a) {
	for (var i in a) {
		if (a[i] == v) {
			return true;
		}
	}
	return false;
}



function getInnerWidth() 
{
	var viewportwidth;
	if (typeof window.innerWidth != 'undefined') 
	{
		viewportwidth = window.innerWidth;
	} 
	else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) 
	{
		viewportwidth = document.documentElement.clientWidth;
	} 
	else 
	{
		viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
	}
	return viewportwidth;
}

function getInnerHeight() 
{
	var viewportheight;
	if (typeof window.innerWidth != 'undefined') 
	{
		viewportheight = window.innerHeight;
	} 
	else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) 
	{
		viewportheight = document.documentElement.clientHeight;
	} 
	else 
	{
		viewportheight = document.getElementsByTagName('body')[0].clientHeight;
	}
	return viewportheight;
}
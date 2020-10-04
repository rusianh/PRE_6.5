/**
 * CHƯƠNG TRÌNH JavaScript QUẢN LÝ MẢNG
 *
 * JavaScript không hỗ trợ lệnh goto. Vì thế nên dùng true/false
 * của choice để làm cho chương trình bị lặp.
 *@created: 2017.09.24
 *@update: 2020.09.25
 */
var list = [];

function main()
{
	var choice = false;
	
	do
	{ 
		console.log("+-----------------------------------------------------------------------------------------------------------+");
		console.log("|                      CHƯƠNG TRÌNH QUẢN LÝ MẢNG (JavaScript)                                   |");
		console.log("|               Copyright (C) 2017 VU VIET ANH <facebook.com/phuongonface>                                |");
		console.log("+-----------------------------------------------------------------------------------------------------------+");
		//console.log("|1. Add |2. Edit |3. Delete |4. Insert |5. Sort |6. Analyze |7. Find |8. Show All |9. View Details |0. Exit |");
		console.log("|1. Thêm |2. Sửa |3. Xóa |4. Chèn |5. Sắp Xếp |6. Thống Kê |7. Tìm |8. Hiển Thị |9. Xem Chi Tiết |0. Thoát |");
		console.log("+-----------------------------------------------------------------------------------------------------------+");
		console.log("(Ấn 'c' hoặc 'C' để xóa màn hình.)");
		
		
		choice = prompt("Lựa chọn của bạn: ", '1');
		
		switch (choice) {
			case '1':
				add();
				break;
			case '2':
				edit();
				break;
			case '3':
				remove();
				break;
			case '4':
				insert();
				break;
			case '5':
				sort();
				break;
			case '6':
				analyze();
				break;
			case '7':
				find();
				break;
			case '8':
				showAll();
				break;
			case '9':
				viewDetails();
				break;
			case '0':
			case 'n':
			case 'N':
				break;
			case 'c':
			case 'C':
				console.clear();
			default:
				console.warn("Lỗi-Lựa chọn không hợp lệ !"); // log(), warn(), error(), info()
				break;
		}// end swicth
	
	    choice = prompt("Bạn có muốn tiếp tục không ? \n"+
				        "- Có, Tôi muốn. (Ấn phím bất kì) \n"+
				        "- Không, tôi không. (Ấn phím 'k' hoặc 'K') \n",
				        
				        "Có");
	    
	    if(choice == 'k' || choice == 'K' || choice == "không" || choice == "Không" || choice == "KHÔNG")
	    	break;
	    
	}while(choice); 
	
	console.log("Cảm ơn bạn đã sử dụng chương trình !");
	
}

main();

/* JavaScript rất linh hoạt về kiểu dữ liệu nên không cần phải
tạo kiều function Student() { this.name....this.year.....this.english}
*/
function add()
{
	var obj = new Object();
	
	obj.name = prompt("Tên Sinh Viên: ");
	obj.year = parseInt(prompt("Năm Sinh: "));
	obj.english = parseFloat(prompt("Tiếng Anh: "));
	
	list.push(obj);
	
	console.info("Đã hoàn tất việc thêm mới vào danh sách !");
}

function edit()
{
	var pos = prompt("Nhập chỉ số của phần tử cần sửa: ");
	
	list[pos].name = prompt("New name: ");
	list[pos].year = parseInt(prompt("New birth year: "));
	list[pos].english = parseFloat(prompt("New english level: "));
	
	console.info("Đã hoàn tất việc sửa !");
}

function remove()
{	
	var pos = prompt("Enter the index to delete:");
	list.splice(pos,1);
	
	console.info("Đã hoàn tất việc xóa !");
}

// https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index
function insert()
{
	var pos = prompt("Nhập chỉ số để chèn: ");
	
	var obj = new Object();
	obj.name = prompt("Tên mới: ");
	obj.year = parseInt(prompt("Năm sinh mới: "));
	obj.english = parseFloat(prompt("Điểm tiếng Anh mới: "));
	
	list.splice(pos,0,obj);
	
		
	console.info("Đã hoàn tất việc chèn !");
}

function sort()
{
	console.log("Sắp xếp theo tên tăng dần...");	
	
	for(var i=0; i<list.length; i++)
	{
		for(var j=i+1; j<list.length; j++)
		{
			// Trật tự logic mà đề bài mong muốn:
			var logic = (list[i].name < list[j].name); // tăng dần theo tên
			//var logic = (list[i].english > list[j].english); // giảm dần theo điểm
			
			// Nếu nó không thỏa mãn thì đổi chỗ
			if (!logic)
			{
				var temp = list[i];
				list[i] = list[j];
				list[j] = temp;
			}
		}
	}
	
	showAll();
}


function analyze()
{
	console.log("Thống Kê / Gộp");	
	
	var sl = [];
	
	for(var i=0; i<list.length; i++)
	{
		sl[i] = 1;
	}
	
	for(var i=0; i<list.length; i++)
	{
		for(var j=i+1; j<list.length; j++)
		{
			if (sl[j]!=0 && list[i].year == list[j].year)
			{
				sl[i]++;
				sl[j]--;
			}
		}
	}
	
	for(var i=0; i<list.length; i++)
	{
		if(sl[i]!=0)
		{
			//console.log("Có %d sinh viên sinh năm %d", sl[i], list[i].year);
			console.log(`Có ${sl[i]} sinh viên sinh năm ${list[i].year}`);
		}
	}	
	
}

// Find student by name and english within (min,max)
function find()
{
	var str = prompt("Tìm theo thên sinh viên: ");
	var min = parseFloat(prompt("Min Điểm Anh Văn: "));
	var max = parseFloat(prompt("Max Điểm Anh Văn: "));
	
	var found = [];
	
	for(var i=0; i<list.length; i++)
	{
		var logic = list[i].name.includes(str) && (min <= list[i].english) && (list[i].english <= max);
		//var logic = (list[i].name == name && min<= list[i].english && list[i].english <=max);
		
		if (logic)
		{
			found.push(list[i]);
		}
	}
	
	if(!found.length)
	{
		console.log("Không tìm thấy !");
		return;
	}
	
	console.log(`Các sinh viên có tên '${name}' mà điểm tiếng Anh nằm trong khoảng (${min}, ${max})`);
	console.table(found);
}


function showAll()
{
	console.table(list);
}

function viewDetails()
{
	console.log("Xem chi tiết bản ghi:...");
	
	var pos = prompt("Nhập chỉ số của bản ghi: ");
	
	console.table( [ list[pos] ] );
}
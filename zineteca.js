var currentZines, detailedZine, detailedInfo, detailedDescription, detaliedCategories;
var header, reader, categoriesSidebar, footer;
var appbackground;
var credits;
var allCategories, currentCategories;
var interfaceElements;
var currentMenu;
var highlightedCategory;

// Espaço Livre 269px
// Inner Width 1349px

class AppHeader {
	constructor() {
		this.overlay = createP("");
		this.overlay.position(0,0);
		this.overlay.size(1349,70);
		this.overlay.style("background-image","url('Assets/header-app.png')");
		this.overlay.style("background-size","1500px 100px");
		this.overlay.style("background-position","-100px -30px");
		this.overlay.style("margin-top","0px");
		this.logoButton = createButton("");
		this.logoButton.position(0,0);
		this.logoButton.size(170,50);
		this.logoButton.style("background-image","url('Assets/logo.png')");
		this.logoButton.style("background-size","167px 50px");
		this.logoButton.style("background-position","center");
		this.logoButton.style("background-color","rgba(0, 0, 0, 0)");
		this.logoButton.style("border","0px");
		this.logoButton.mouseClicked(returnToMainMenu);
		this.searchBar = createInput();
		this.searchBar.attribute("placeholder","Buscar...");
		this.searchBar.position(509,8);
		this.searchBar.size(600,30);
		this.searchBar.style("background-color","rgba(255, 255, 255, 0.5)");
		this.searchBar.style("font-family","Dosis Extra Light");
		this.searchBar.style("font-size","24px");
		this.searchBar.style("border","0px");
		this.searchButton = createButton("");
		this.searchButton.position(1079,13);
		this.searchButton.size(20,20);
		this.searchButton.style("background-image","url('Assets/search icon.png')");
		this.searchButton.style("background-size","20px 20px");
		this.searchButton.style("background-color","rgba(0, 0, 0, 0)");
		this.searchButton.style("border","0px");
		this.searchButton.style("background-repeat","no-repeat");
		this.searchButton.mouseClicked(search);
	}

	getSearchBar() {
		return this.searchBar;
	}

	update() {
		this.resize();
	}

	resize() { // OK
		this.overlay.size(innerWidth,0.052*innerWidth);
		this.overlay.style("background-size",(1.111*innerWidth)+"px "+(0.074*innerWidth)+"px");
		this.overlay.style("background-position",(-0.074*innerWidth)+"px "+(-0.022*innerWidth)+"px");
		this.logoButton.size(0.126*innerWidth,0.037*innerWidth);
		this.logoButton.style("background-size",(0.124*innerWidth)+"px "+(0.037*innerWidth)+"px");
		this.searchBar.position(0.178*innerWidth,0.006*innerWidth);
		this.searchBar.size(0.445*innerWidth,0.022*innerWidth);
		this.searchBar.style("font-size",(0.018*innerWidth)+"px");
		this.searchButton.position(0.6*innerWidth,0.01*innerWidth);
		this.searchButton.size(0.015*innerWidth,0.015*innerWidth);
		this.searchButton.style("background-size",(0.015*innerWidth)+"px "+(0.015*innerWidth)+"px");
	}
}

class InteractiveElement {
	constructor(xPos,yPos,widthSize,heightSize) {
		this.x = xPos;
		this.y = yPos;
		this.width = widthSize;
		this.height = heightSize;
		this.active = true;
	}

	setX(newX) {
		this.x = newX;
	}

	getX() {
		return this.x;
	}

	setY(newY) {
		this.y = newY;
	}

	getY() {
		return this.y;
	}

	setWidth(newWidth) {
		this.width = newWidth;
	}

	getWidth() {
		return this.width;
	}

	setHeight(newHeight) {
		this.height = newHeight;
	}

	getHeight() {
		return this.height;
	}

	setInactive() {
		this.active = false;
	}

	setActive() {
		this.active = true;
	}

	isActive() {
		return this.active;
	}

	update() {

	}

	hide() {

	}

	show() {

	}
}

class InteractiveDisplay extends InteractiveElement {
	constructor(background,coverImage,xPos,yPos,widthSize,heightSize) {
		super(xPos,yPos,widthSize,heightSize);
		this.setBackground(background);
		this.background.position(this.getX(),this.getY());
		this.background.size(this.getWidth(),this.getHeight());
		this.setCoverImage(coverImage);
		this.coverImage.position(this.getX()+this.getWidth()*0.15,this.getY()+this.getHeight()*0.15);
		this.coverImage.size(this.getWidth()*0.7,this.getHeight()*0.7);
		this.angle = 0;
		this.coverImage.zineID = -1;
		this.coverImage.inside = false;
	}

	generateImage(imagePath) {
		let elementImage = createImg(imagePath,"");
		elementImage.style("background-position","center");
		return elementImage;
	}

	setBackground(imagePath) {
		this.background = this.generateImage(imagePath);
		this.background.style("background-size",this.getWidth()+"px "+this.getHeight()+"px");
	}

	getBackground() {
		return this.background;
	}

	setCoverImage(imagePath) {
		this.coverImage = this.generateImage(imagePath);
		this.coverImage.mouseOver(this.isInside);
		this.coverImage.mouseOut(this.isOutside);
		this.coverImage.mouseClicked(this.clicked);
		this.coverImage.style("background-size",this.getWidth()*0.7+"px "+this.getHeight()*0.7+"px");
		this.coverImage.style("background-position",this.getWidth()*0.15+"px "+this.getHeight()*0.15+"px");
		this.coverImage.style("background-repeat","no-repeat");
	}

	getCoverImage() {
		return this.coverImage;
	}

	setZineID(newID) {
		this.coverImage.zineID = newID;
	}

	getZineID() {
		return this.coverImage.zineID;
	}

	setAngle(newAngle) {
		this.angle = newAngle;
	}

	getAngle() {
		return this.angle;
	}

	update() {
		if (!this.isActive()) {
			return;
		}

		if (this.coverImage.inside && this.angle < 20) {
			this.angle += 2;
		} else if (!this.coverImage.inside && this.angle > 0) {
			this.angle -= 2;
		} else {
			return;
		}
		this.background.size(this.getWidth()+(this.angle*this.getWidth()*0.01),this.getHeight()+(this.angle*this.getHeight()*0.01));
		this.background.style("rotate",-this.angle);
		this.coverImage.size(this.getWidth()*0.7+(this.angle*this.getWidth()*0.01),this.getHeight()*0.7+(this.angle*this.getHeight()*0.01));
		this.coverImage.style("rotate",-this.angle);
	}

	clicked() {
		if (this.zineID === -1) {
			return;
		}
		showInDetail(this.zineID);
	}

	isInside() {
		this.inside = true;
	}

	isOutside() {
		this.inside = false;
	}

	hide() {
		this.background.hide();
		this.coverImage.hide();
	}

	show() {
		this.background.show();
		this.coverImage.show();
	}

	remove() {
		this.setInactive();
		this.background.remove();
		this.coverImage.remove();
	}
}

class InteractiveButton extends InteractiveElement {
	constructor(categoryName,xPos,yPos,widthSize,heightSize,index) {
		super(xPos,yPos,widthSize,heightSize);
		this.setCategoryLabel(categoryName, index);
		this.sizeValue = 0;
		this.categoryLabel.inside = false;
		this.categoryLabel.text = categoryName;
	}

	setCategoryLabel(text, index) {
		this.categoryLabel = createP("<br>"+text);
		this.categoryLabel.position(this.x,this.y);
		this.categoryLabel.size(this.width,this.height);
		this.categoryLabel.mouseOver(this.isInside);
		this.categoryLabel.mouseOut(this.isOutside);
		this.categoryLabel.mouseClicked(this.clicked);
		this.categoryLabel.style("text-transform","uppercase");
		this.categoryLabel.style("text-align","center");
		this.categoryLabel.style("font-family","Dosis Extra Bold");
		this.categoryLabel.style("font-size","30px");
		this.categoryLabel.style("background-image","url('Assets/category-app-"+index+".png')");
		this.categoryLabel.style("background-size",(this.getWidth()*3)+"px "+this.getHeight()+"px");
		this.categoryLabel.style("background-repeat","no-repeat");
	}

	getCategoryLabel() {
		return this.categoryLabel;
	}

	setSizeValue(newValue) {
		this.sizeValue = newValue;
	}

	getSizeValue() {
		return this.sizeValue;
	}

	update() {
		if (!this.isActive()) {
			return;
		}

		if (this.categoryLabel.inside && this.sizeValue < 20) {
			this.sizeValue += 2;
		} else if (!this.categoryLabel.inside && this.sizeValue > 0) {
			this.sizeValue -= 2;
		} else {
			return;
		}
		this.categoryLabel.position(this.getX(),this.getY()-(this.sizeValue*1.4)); // this.sizeValue*3
		this.categoryLabel.size(this.getWidth()+(this.sizeValue*0.003*this.getWidth()),this.getHeight()+(this.sizeValue*1.4));
	}

	clicked() {
		showCategory(this.text);
	}

	isInside() {
		this.inside = true;
	}

	isOutside() {
		this.inside = false;
	}

	hide() {
		this.categoryLabel.hide();
	}

	show() {
		this.categoryLabel.show();
	}

	remove() {
		this.setInactive();
		this.categoryLabel.remove();
	}
}

class InteractiveText extends InteractiveElement {
	constructor(xPos,yPos,widthSize,heightSize,text,image) {
		super(xPos,yPos,widthSize,heightSize);
		this.setContent(text,image);
	}

	getContent() {
		return this.content;
	}

	setContent(text,image) {
		this.content = createP(text);
		this.content.position(this.getX(),this.getY());
		this.content.size(this.getWidth(),this.getHeight());
		this.content.style("background-image","url('"+image+"')");
		this.content.style("background-size",this.getWidth()+"px "+this.getHeight()+"px");
		this.content.style("font-family","Dosis");
		this.content.style("font-size","24px");
		this.content.style("text-shadow","4px 4px 4px #DDDDDD");
	}

	hide() {
		this.content.hide();
	}

	show() {
		this.content.show();
	}

	remove() {
		this.setInactive();
		this.content.remove();
	}
}

class InteractiveBigText extends InteractiveText {
	constructor(xPos,yPos,widthSize,heightSize,text,image) {
		super(xPos,yPos,widthSize,heightSize,text,image);
		this.getContent().style("text-shadow","2px 2px 2px #000000");
		this.getContent().style("text-align","center");
		this.getContent().style("font-family","Title Zineteca");
	}
}

class ZineReader extends InteractiveElement {
	constructor(zine,x,y,widthSize,heightSize) {
		super(x,y,widthSize,heightSize);
		this.setReader(zine);
	}

	setReader(zine) {
		this.leitor = createDiv("<div class='hard'>  </div>");
		this.leitor.id("flipbook");
		this.leitor.position(this.getX(),this.getY());
		this.leitor.size(this.getWidth(),this.getHeight());

		let capa = createDiv("");
		capa.style("background-image","url('Zines/"+zine.getPagesTag()+"/capa.jpg')");
		capa.style("background-size",this.getWidth()/2+"px "+this.getHeight()+"px");
		capa.class("p1");
		capa.size(this.getWidth()/2,this.getHeight());
		capa.parent("flipbook");

		for(let page = 1; page <= zine.getPagesNumber(); page++) {
			let numberPage = page + 1;
			let pagina = createDiv("");
			pagina.style("background-image","url('Zines/"+zine.getPagesTag()+"/pag"+page+".jpg')");
			pagina.style("background-size",this.getWidth()/2+"px "+this.getHeight()+"px");
			pagina.class("p"+numberPage);
			pagina.size(this.getWidth()/2,this.getHeight());
			pagina.parent("flipbook");
		}

		this.leitor = $("#flipbook");
		this.leitor.turn({
		    width: this.getWidth(),
		    height: this.getHeight(),
		    autoCenter: true
		});
		this.leitor.turn("resize");

		return select("#flipbook");
	}

	getReader() {
		return this.leitor;
	}

	hide() {
		this.leitor.hide();
	}

	show() {
		this.leitor.show();
	}

	remove() {
		this.leitor.remove();
	}
}

function hideAll() {
	for (var i = interfaceElements.length - 1; i >= 0; i--) {
		for (var j = interfaceElements[i].length - 1; j >= 0; j--) {
			interfaceElements[i][j].hide();
		}
	}
}

function displayMenu(menu) {
	hideAll();
	for (var j = interfaceElements[menu].length - 1; j >= 0; j--) {
		interfaceElements[menu][j].show();
	}
}

function returnToMainMenu() {
	let menu1 = [];
	let popularLabel = new InteractiveBigText(509,80,600,60,"<span style='font-size:64px;'>Zines</span>","");
	menu1.push(popularLabel);
	pos = 200;
	for(i=0;i<allZines.length;i++) {
		let zineDisplay = new InteractiveDisplay("Assets/cover-"+i%6+".png","Assets/"+allZines[i].getCoverImage(),569-200*(int(i/2)%2)+400*(i%2),pos+100*(int(i/2)%2),180,280);
		zineDisplay.setZineID(i);
		menu1.push(zineDisplay);
		if (i % 4 === 3) {
			pos += 300;
		}
	}
	pos += 400;

	changeMenu(0,menu1);
	appbackground.getBackground().size(1349,max(pos,100+allCategories.length*100));
	appbackground.getCoverImage().size(0,0);
	displayMenu(currentMenu);
}

function showInDetail(index) {
	let chosenZine = allZines[index];

	// Description Menu Rebuilding
	let menu2 = [];
	let descriptionBackground = new InteractiveDisplay("Assets/cardboard.png","",369,100,880,500);
	descriptionBackground.setInactive();
	let descriptionDivider = new InteractiveDisplay("Assets/description-separator.png","",469,310,780,80);
	descriptionDivider.setInactive();
	let zineDescriptionBG = new InteractiveDisplay("Assets/description-cardboard.png","",519,120,700,180);
	zineDescriptionBG.setInactive();

	detailedCategories = [];
	for(i=0;i<chosenZine.getAllCategories().length;i++) {
		let categoryTag = new InteractiveButton(chosenZine.getCategory(i),560+(i%3)*220,390+80*int(i/3),220,70,i%4);
		categoryTag.getCategoryLabel().style("font-size","20px");
		categoryTag.getCategoryLabel().style("background-size","220px 50px");
		categoryTag.getCategoryLabel().style("background-position","0px 15px");
		categoryTag.getCategoryLabel().style("background-repeat","no-repeat");
		detailedCategories.push(categoryTag);
		menu2.push(categoryTag);
	}

	let zineBackground = new InteractiveDisplay("Assets/zine-displayer.png","",319,80,280,540);
	zineBackground.setInactive();
	detailedZine = new InteractiveDisplay("Assets/cover-"+(index%6)+".png","Assets/"+chosenZine.getCoverImage(),369,100,180,280);
	detailedZine.setZineID(index);
	detailedZine.setInactive();
	let readButton = new InteractiveDisplay("Assets/button.png","Assets/read-button.png",394,500,150,60);
	readButton.getCoverImage().mouseClicked(readZine);
	detailedDescription = new InteractiveText(619,100,600,180,"<span style='font-family:Dosis Extra Bold;'>Descrição</span><span style='font-size:16px;'><br>"+chosenZine.getDescription(),"");
	detailedInfo = new InteractiveText(369,380,180,100,"<span style='font-family:Dosis Extra Bold;'>"+chosenZine.getName()+"</span><br>"+chosenZine.getAuthor(),"");
	detailedInfo.getContent().style("font-size","20px");
	let categoryLabel = new InteractiveText(799,305,200,40,"","Assets/categorias-cardboard.png");

	menu2.push(descriptionBackground);
	menu2.push(descriptionDivider);
	menu2.push(detailedDescription);
	menu2.push(zineDescriptionBG);
	menu2.push(categoryLabel);
	menu2.push(detailedInfo);
	menu2.push(zineBackground);
	menu2.push(detailedZine);
	menu2.push(readButton);

	changeMenu(1,menu2);
	appbackground.getBackground().size(1349,760);
	appbackground.getCoverImage().size(0,0);
	displayMenu(currentMenu);
}

function showCategory(categoryName) {
	let chosenCategory = categoryName;

	let menu3 = [];
	let categoryLabel = new InteractiveBigText(509,80,600,60,"<span style='font-size:64px;font-transform:'>"+chosenCategory+"</span>","");
	categoryLabel.getContent().style("text-align","center");
	categoryLabel.getContent().style("font-family","Title Zineteca");
	menu3.push(categoryLabel);
	currentZines = [];
	let pos = 250;
	for(let i=0;i<allZines.length;i++) {
		if (allZines[i].findCategoryIndex(chosenCategory) !== -1) {
			let result = currentZines.length;
			currentZines.push(allZines[i]);
			let zineTemp = new InteractiveDisplay("Assets/cover-"+(result%6)+".png","Assets/"+allZines[i].getCoverImage(),569-200*(int(result/2)%2)+400*(result%2),pos+100*(int(result/2)%2),180,280); //300-200*(int(result/2)%2)+400*(result%2),200+100*(int(result/2)%2)
			zineTemp.setZineID(i);
			menu3.push(zineTemp);
			if (result % 4 === 3) {
				pos += 300;
			}
		}
	}

	pos += 400;
	changeMenu(2,menu3);
	appbackground.getBackground().size(1349,max(pos,100+allCategories.length*100));
	appbackground.getCoverImage().size(0,0);
	displayMenu(currentMenu);
}

function search() {
	currentZines = [];
	currentCategories = [];

	let searchTag = header.getSearchBar().value();
	if (searchTag === "") {
		return;
	}
	let menu4 = [];
	let pos = -50;

	for (let i = allCategories.length - 1; i >= 0; i--) {
		if (allCategories[i].toLowerCase().search(searchTag.toLowerCase()) !== -1) {
			currentCategories.push(allCategories[i]);
		}
	}

	for (let i = allZines.length - 1; i >= 0; i--) {
		if (allZines[i].getName().toLowerCase().search(searchTag.toLowerCase()) !== -1) {
			currentZines.push(allZines[i]);
		}
	}

	let searchLabel = new InteractiveBigText(269,80,1080,60,"<span style='font-size:64px;font-transform:'>Resultados para '"+searchTag+"'</span>","");

	let zineLabel;
	if (currentZines.length > 0) {
		zineLabel = new InteractiveBigText(269,150,1080,60,"<span style='font-size:48px;font-transform:'>Zines</span>","");
		for(i=0;i<currentZines.length;i++) {
			if (i%4 === 0) {
				pos += 300;
			}
			let zineDisplay = new InteractiveDisplay("Assets/cover-"+i%6+".png","Assets/"+currentZines[i].getCoverImage(),569-200*(int(i/2)%2)+400*(i%2),pos+100*(int(i/2)%2),180,280);
			let ID = allZines.indexOf(currentZines[i]);
			zineDisplay.setZineID(ID);
			menu4.push(zineDisplay);
		}
	} else {
		zineLabel = new InteractiveBigText(269,250,1080,60,"<span style='font-size:48px;font-transform:'>Nenhum resultado em Zines</span>","");
		pos += 100;
	}
	menu4.push(zineLabel);

	let categoryLabel;
	pos += 300;
	if (currentCategories.length > 0) {
		categoryLabel = new InteractiveBigText(269,pos,1080,60,"<span style='font-size:48px;font-transform:'>Categorias</span>","");
		pos -= 20;

		for(i=0;i<currentCategories.length;i++) {
			pos += 100;
			let category = new InteractiveButton(currentCategories[i],219,pos,1130,200,i%4);
			category.getCategoryLabel().style("rotate",0);
			menu4.push(category);
		}
	} else {
		categoryLabel = new InteractiveBigText(269,pos,1080,60,"<span style='font-size:48px;font-transform:'>Nenhum resultado em Categorias</span>","");
	}
	menu4.push(categoryLabel);
	menu4.push(searchLabel);

	pos += 400;
	changeMenu(3,menu4);
	appbackground.getBackground().size(1349,max(pos,100+allCategories.length*100));
	appbackground.getCoverImage().size(0,0);
	displayMenu(currentMenu);
}

function startReader(zine, x, y, largura, altura) {
	return new ZineReader(zine,x,y,largura,altura);
}

function readZine() {
	let menu5 = [];
	let zine = allZines[detailedZine.getCoverImage().zineID];
	let leitorLabel = new InteractiveBigText(269,60,1080,60,"<span style='font-size:64px;'>"+zine.getName()+"</span>","");

	if (reader) {
		reader.remove();
	}
	reader = startReader(zine, 449, 100, 720, 550);
	menu5.push(leitorLabel);
	menu5.push(reader);

	changeMenu(4,menu5);
	appbackground.getBackground().size(1349,980);
	appbackground.getCoverImage().size(0,0);
	displayMenu(currentMenu);
}

function changeMenu(menuID, newElements) {
	currentMenu = menuID;
	for (var i = interfaceElements[menuID].length - 1; i >= 0; i--) {
		interfaceElements[menuID][i].remove();
	}
	interfaceElements[menuID].length = 0;
	interfaceElements[menuID] = newElements;
}

function setup() {
	angleMode(DEGREES);

	allCategories = [];
	for (var i = allZines.length - 1; i >= 0; i--) {
		let categories = allZines[i].getAllCategories();
		for (var j = categories.length - 1; j >= 0; j--) {
			let found = allCategories.includes(categories[j]);
			if (!found) {
				allCategories.push(categories[j]);
			}
		}
	}

	currentZines = [];
	currentCategories = [];

	interfaceElements = [];
	categoriesSidebar = [];

	appbackground = new InteractiveDisplay("Assets/background-app.png","",0,0,1349,1720);
	appbackground.getCoverImage().style("margin-top","0px");
	appbackground.getBackground().position(0,0);

	let categoryLabel = new InteractiveBigText(0,50,280,50,"Categorias","");
	categoryLabel.getContent().style("font-size","32px");
	categoriesSidebar.push(categoryLabel);
	for(i=0;i<allCategories.length;i++) {
		let buttonCategory = new InteractiveButton(allCategories[i],-20,100+i*100,300,150,i%4)
		buttonCategory.getCategoryLabel().style("background-position","-600px 0px");
		buttonCategory.getCategoryLabel().style("rotate",10);
		categoriesSidebar.push(buttonCategory);
	}

	// Main Menu
	let menu1 = [];

	// Description Menu
	let menu2 = [];

	// Category Menu
	let menu3 = [];

	// Search Menu
	let menu4 = [];

	// Read Menu (Leitor)
	let menu5 = [];

	interfaceElements.push(menu1);
	interfaceElements.push(menu2);
	interfaceElements.push(menu3);
	interfaceElements.push(menu4);
	interfaceElements.push(menu5);

	returnToMainMenu();

	header = new AppHeader();
}

function draw() {
	header.update();
	for (let i = interfaceElements[currentMenu].length - 1; i >= 0; i--) {
		interfaceElements[currentMenu][i].update();
	}
	for (var i = categoriesSidebar.length - 1; i >= 0; i--) {
		categoriesSidebar[i].update();
	}
}
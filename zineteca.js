var currentZines, detailedZine, detailedInfo, detailedDescription, detaliedCategories;
var header;
var appbackground;
var credits;
var allCategories;
var interfaceElements;
var currentMenu;
var highlightedCategory;

class AppHeader {
	constructor() {
		this.overlay = createP("");
		this.overlay.position(0,0);
		this.overlay.size(1080,70);
		this.overlay.style("background-image","url('Assets/header-app.png')");
		this.overlay.style("background-size","1500px 100px");
		this.overlay.style("background-position","-100px -30px");
		//this.overlay.style("background-color","#BA007C");
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
		this.searchBar = createInput("Buscar...");
		this.searchBar.position(240,8); // 240
		this.searchBar.size(600,30);
		this.searchBar.style("background-color","rgba(255, 255, 255, 0.5)");
		this.searchBar.style("font-family","Dosis");
		this.searchBar.style("font-size","24px");
		this.searchBar.style("font-weight","lighter");
		this.searchBar.style("border","0px");
		this.searchButton = createButton("");
		this.searchButton.position(810,13);
		this.searchButton.size(20,20);
		this.searchButton.style("background-image","url('Assets/search icon.png')");
		this.searchButton.style("background-size","20px 20px");
		//this.searchButton.style("background-position","center");
		this.searchButton.style("background-color","rgba(0, 0, 0, 0)");
		this.searchButton.style("border","0px");
		this.searchButton.mouseClicked(search);
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
}

class InteractiveButton extends InteractiveElement {
	constructor(categoryName,xPos,yPos,widthSize,heightSize,index) {
		super(xPos,yPos,widthSize,heightSize);
		this.setCategoryLabel(categoryName, index);
		this.sizeValue = 0;
		this.categoryLabel.inside = false;
	}

	setCategoryLabel(text, index) {
		this.categoryLabel = createP("<br>"+text);
		this.categoryLabel.position(this.x,this.y);
		this.categoryLabel.size(this.width,this.height);
		this.categoryLabel.mouseOver(this.isInside);
		this.categoryLabel.mouseOut(this.isOutside);
		this.categoryLabel.style("text-transform","uppercase");
		this.categoryLabel.style("text-align","center");
		this.categoryLabel.style("font-family","Dosis");
		this.categoryLabel.style("font-size","40px");
		this.categoryLabel.style("font-weight","bolder");
		this.categoryLabel.style("background-image","url('Assets/category-app-"+index+".png')");
		this.categoryLabel.style("background-size","1700px 200px");
		this.categoryLabel.style("background-repeat","repeat-x");
		this.categoryLabel.style("rotate",10);
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
		this.categoryLabel.position(this.getX(),this.getY()-(this.sizeValue*3));
		this.categoryLabel.size(this.getWidth()+(this.sizeValue*0.003*this.getWidth()),this.getHeight()+(this.sizeValue*0.02*this.getHeight())); //650,200
	}

	clicked() {
		
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
	currentMenu = 0;
	appbackground.getCoverImage().size(1080,1720);
	displayMenu(currentMenu);
}

function showInDetail(index) {
	let chosenZine = allZines[index];
	currentMenu = 1;
	interfaceElements[1].length = 0;

	// Description Menu Rebuilding
	let menu2 = [];
	let descriptionBackground = new InteractiveDisplay("Assets/cardboard.png","",100,100,880,500);
	descriptionBackground.setInactive();
	let descriptionDivider = new InteractiveDisplay("Assets/description-separator.png","",200,310,780,80);
	descriptionDivider.setInactive();
	let zineDescriptionBG = new InteractiveDisplay("Assets/description-cardboard.png","",250,120,700,180);
	zineDescriptionBG.setInactive();

	detailedCategories = [];
	for(i=0;i<chosenZine.getAllCategories().length;i++) {
		let categoryTag = new InteractiveButton(chosenZine.getCategory(i),291+(i%3)*220,390+80*int(i/3),220,70,i%4);
		categoryTag.getCategoryLabel().style("font-size","20px");
		categoryTag.getCategoryLabel().style("background-size","220px 50px");
		categoryTag.getCategoryLabel().style("background-position","0px 15px");
		categoryTag.getCategoryLabel().style("rotate","0");
		categoryTag.getCategoryLabel().style("background-repeat","no-repeat");
		detailedCategories.push(categoryTag);
		menu2.push(categoryTag);
	}

	let zineBackground = new InteractiveDisplay("Assets/zine-displayer.png","",50,80,280,540);
	zineBackground.setInactive();
	detailedZine = new InteractiveDisplay("Assets/cover-"+index+".png","Assets/"+chosenZine.getCoverImage(),100,100,180,280);
	detailedZine.setInactive();
	let readButton = new InteractiveDisplay("Assets/button.png","Assets/read-button.png",125,500,150,60);
	readButton.getCoverImage().mouseClicked(readZine);
	detailedDescription = new InteractiveText(350,100,600,180,"<span style='font-weight:bolder;'>Descrição</span><span style='font-size:16px;'><br>"+chosenZine.getDescription(),"");
	detailedInfo = new InteractiveText(100,380,180,100,"<span style='font-weight:bolder;'>"+chosenZine.getName()+"</span><br>"+chosenZine.getAuthor(),"");
	detailedInfo.getContent().style("font-size","20px");
	let categoryLabel = new InteractiveText(530,305,200,40,"","Assets/categorias-cardboard.png");

	menu2.push(descriptionBackground);
	menu2.push(descriptionDivider);
	menu2.push(detailedDescription);
	menu2.push(zineDescriptionBG);
	menu2.push(categoryLabel);
	menu2.push(detailedInfo);
	menu2.push(zineBackground);
	menu2.push(detailedZine);
	menu2.push(readButton);
	interfaceElements[1] = menu2;
	appbackground.getCoverImage().size(1080,760);
	displayMenu(currentMenu);
}

function search() {
	currentMenu = 3;
	appbackground.getCoverImage().size(1080,1520);
	displayMenu(currentMenu);
}

function readZine() {
	currentMenu = 4;
	appbackground.getCoverImage().size(1080,760);
	displayMenu(currentMenu);
}

function setup() {
	angleMode(DEGREES);

	allCategories = [];
	for (var i = allZines.length - 1; i >= 0; i--) {
		let categories = allZines[i].getAllCategories()
		for (var j = categories.length - 1; j >= 0; j--) {
			let found = allCategories.includes(categories[j]);
			if (!found) {
				allCategories.push(categories[j]);
			}
		}
	}

	currentZines = [];

	interfaceElements = [];

	appbackground = new InteractiveDisplay("Assets/background-app.png","",0,0,1080,1720);
	appbackground.getBackground().style("margin-top","0px");
	appbackground.getCoverImage().position(0,0);

	// Main Menu
	let menu1 = [];
	let popularLabel = new InteractiveText(240,80,600,60,"<span style='font-weight:medium;font-size:48px;'>MAIS POPULARES</span>","");
	popularLabel.getContent().style("text-align","center");
	popularLabel.getContent().style("font-family","Rudiment");
	menu1.push(popularLabel);
	for(i=0;i<allZines.length;i++) {
		let zineDisplay = new InteractiveDisplay("Assets/cover-"+i%6+".png","Assets/"+allZines[i].getCoverImage(),100+200*(i%4),300-100*(i%2)+300*int(i/4),180,280);
		zineDisplay.setZineID(i);
		menu1.push(zineDisplay);
	}
	for(i=0;i<min(allCategories.length,6);i++) {
		menu1.push(new InteractiveButton(allCategories[i],-50,900+i*100,650,200,i%4));
	}
	let credits = new InteractiveText(520,900,560,800,"<br><br><span style='font-weight:bolder;font-size:30px;'>Créditos</span><br>Equipe Art Lab","Assets/credits-app.png");
	credits.getContent().style("text-align","center");
	menu1.push(credits);

	// Description Menu
	let menu2 = [];

	// Category Menu
	let menu3 = [];
	for(i=0;i<16;i++) {
		menu3.push(new InteractiveDisplay("Assets/cover-"+(i%6)+".png","",100+200*(i%4),300-100*(i%2)+300*int(i/4),180,280));
	}
	let bigCategoryLabel = new InteractiveText(340,75,400,80,"","Assets/categorias-grey.png");
	menu3.push(bigCategoryLabel);

	// Search Menu
	let menu4 = [];
	for(i=0;i<16;i++) {
		menu4.push(new InteractiveDisplay("Assets/cover-"+(i%6)+".png","",100+200*(i%4),300-100*(i%2)+300*int(i/4),180,280));
	}
	let searchResultsLabel = new InteractiveText(340,75,400,80,"","Assets/categorias-cardboard.png");
	menu4.push(searchResultsLabel);

	// Read Menu (Leitor)
	let menu5 = []; /* TENTA COLOCAR OS ELEMENTOS NESSE ARRAY, SE POSSÍVEL */

	interfaceElements.push(menu1);
	interfaceElements.push(menu2);
	interfaceElements.push(menu3);
	interfaceElements.push(menu4);
	interfaceElements.push(menu5);

	//returnToMainMenu();
	readZine(0);

	header = new AppHeader();
}

function draw() {
	for (var i = interfaceElements[currentMenu].length - 1; i >= 0; i--) {
		interfaceElements[currentMenu][i].update();
	}
}
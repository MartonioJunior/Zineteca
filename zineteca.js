var allZines;
var currentZines;
var header;
var appbackground;
var credits;
var allCategories;
var interfaceElements;
var currentMenu;
var highlightedCategory;

class Zine {
	constructor(id,coverImage,pdf,name,author,description) {
		this.id = id;
		this.coverImage = coverImage;
		this.pdf = pdf;
		this.name = name;
		this.author = author;
		this.description = description;
		this.categories = [];
	}

	getID() {
		return this.id;
	}

	setCoverImage(imagePath) {
		this.coverImage = loadImage(imagePath);
	}

	getCoverImage() {
		return this.coverImage;
	}

	setPdf(newPdf) {
		this.pdf = newPdf;
	}

	getPdf() {
		return this.pdf;
	}

	setName(newName) {
		this.name = newName;
	}

	getName() {
		return this.name;
	}

	setAuthor(newAuthor) {
		this.author = newAuthor;
	}

	getAuthor() {
		return this.author;
	}

	setDescription(newDescription) {
		this.description = newDescription;
	}

	getDescription() {
		return this.description;
	}

	addCategory(newCategory) {
		this.categories.push(newCategory);
	}

	findCategory(categoryName) {
		return this.categories.find(categoryName);
	}

	removeCategory(index) {
		if (index < 0 || index >= this.categories.length)
		this.categories.splice(index,1);
	}

	getCategory(index) {
		return this.categories[index];
	}
}

class AppHeader {
	constructor() {
		this.overlay = createP("");
		this.overlay.position(0,0);
		this.overlay.size(1080,50);
		this.overlay.style("background-color","#BA007C");
		this.overlay.style("margin-top","0px");
		this.button = createButton("");
		this.button.position(0,0);
		this.button.size(170,50);
		this.button.style("background-image","url('Assets/logo.png')");
		this.button.style("background-size","167px 50px");
		this.button.style("background-position","center");
		this.button.style("background-color","#BA007C");
		this.button.style("border","0px");
		this.button.mouseClicked(returnToMainMenu);
		this.searchBar = createInput("Buscar...");
		this.searchBar.position(300,5);
		this.searchBar.size(600,30);
		this.searchBar.style("font-family","Dosis");
		this.searchBar.style("font-size","24px");
		this.searchBar.style("font-weight","lighter");
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
	constructor(coverImage,xPos,yPos,widthSize,heightSize) {
		super(xPos,yPos,widthSize,heightSize);
		this.setCoverImage(coverImage);
		this.coverImage.position(this.getX(),this.getY());
		this.coverImage.size(this.getWidth(),this.getHeight());
		this.angle = 0;
		this.coverImage.inside = false;
	}

	setCoverImage(imagePath) {
		this.coverImage = createImg(imagePath);
		this.coverImage.style("background-position","center");
		this.coverImage.style("background-size",this.getWidth()+"px "+this.getHeight()+"px");
		this.coverImage.mouseOver(this.isInside);
		this.coverImage.mouseOut(this.isOutside);
	}

	getCoverImage() {
		return this.coverImage;
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
		this.coverImage.size(this.getWidth()+(this.angle*1.8),this.getHeight()+(this.angle*3));
		this.coverImage.style("rotate",-this.angle);
	}

	isInside() {
		this.inside = true;
	}

	isOutside() {
		this.inside = false;
	}

	hide() {
		this.coverImage.hide();
	}

	show() {
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
		this.categoryLabel.size(this.getWidth()+(this.sizeValue*1.8),this.getHeight()+(this.sizeValue*3));
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
	displayMenu(currentMenu);
}

function setup() {
	angleMode(DEGREES);

	allZines = [];
	allCategories = [];
	currentZines = [];
	interfaceElements = [];

	appbackground = new InteractiveDisplay("Assets/background-app.png",0,0,1080,1720);
	appbackground.getCoverImage().style("margin-top","0px");

	currentMenu = 1;

	let menu1 = [];

	for(i=0;i<8;i++) {
		menu1.push(new InteractiveDisplay("Assets/cover-"+(i%6)+".png",100+200*(i%4),200-100*(i%2)+300*int(i/4),180,280));
	}
	for(i=0;i<6;i++) {
		menu1.push(new InteractiveButton("Nome da Categoria",-50,900+i*100,650,200,i%4));
	}
	let credits = new InteractiveText(520,900,560,800,"<br><br><span style='font-weight:bolder;font-size:30px;'>Créditos</span><br>Equipe Art Lab","Assets/credits-app.png");
	credits.getContent().style("text-align","center");
	menu1.push(credits);

	let menu2 = [];

	let descriptionBackground = new InteractiveDisplay("Assets/cardboard.png",100,100,880,500);
	descriptionBackground.setInactive();
	let descriptionDivider = new InteractiveDisplay("Assets/description-separator.png",200,310,780,80);
	descriptionDivider.setInactive();
	let zineDescriptionBG = new InteractiveDisplay("Assets/description-cardboard.png",250,120,700,180);
	zineDescriptionBG.setInactive();

	for(i=0;i<5;i++) {
		let categoryTag = new InteractiveButton("Categoria "+i,311+i*133,390,133,100,i%4);
		categoryTag.getCategoryLabel().style("font-size","20px");
		categoryTag.getCategoryLabel().style("background-size","180px 50px");
		categoryTag.getCategoryLabel().style("background-position","-15px 15px");
		categoryTag.getCategoryLabel().style("rotate","0");
		categoryTag.getCategoryLabel().style("background-repeat","no-repeat");
		menu2.push(categoryTag);
	}

	let zineBackground = new InteractiveDisplay("Assets/zine-displayer.png",50,80,280,540);
	zineBackground.setInactive();
	let zine = new InteractiveDisplay("Assets/cover-4.png",100,100,180,280);
	zine.setInactive();
	let readButton = new InteractiveDisplay("Assets/read-button.png",125,500,150,50);
	let zineDescription = new InteractiveText(350,100,600,180,"Descrição<span style='font-weight:lighter;font-size:16px;'><br>Esta zine é dedicada a falar sobre as coisas simples da vida, contando histórias reais de pessoas que mudaram de vida por causa de algo que parecia ser irrelevante.","");
	let zineInfo = new InteractiveText(100,380,180,100,"<span style='font-weight:bolder;'>All Things Ordinary</span><br>Mark C. Lane","");
	zineInfo.getContent().style("font-size","20px")
	let categoryLabel = new InteractiveText(530,305,200,40,"","Assets/categorias-cardboard.png");

	menu2.push(descriptionBackground);
	menu2.push(descriptionDivider);
	menu2.push(zineDescription);
	menu2.push(zineDescriptionBG);
	menu2.push(categoryLabel);
	menu2.push(zineInfo);
	menu2.push(zineBackground);
	menu2.push(zine);
	menu2.push(readButton);

	let menu3 = [];
	let menu4 = [];

	interfaceElements.push(menu1);
	interfaceElements.push(menu2);
	interfaceElements.push(menu3);
	interfaceElements.push(menu4);

	displayMenu(currentMenu);

	header = new AppHeader();
}

function draw() {
	for (var i = interfaceElements[currentMenu].length - 1; i >= 0; i--) {
		interfaceElements[currentMenu][i].update();
	}
}
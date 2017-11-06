var allZines, currentZines, header, appbackground, credits, allCategories, interfaceElements;

class Zine {
	constructor(coverImage,pdf,name,author,description) {
		this.coverImage = coverImage;
		this.pdf = pdf;
		this.name = name;
		this.author = author;
		this.description = description;
		this.categories = [];
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
	}
}

class ZineDisplay {
	constructor(coverImage,xPos,yPos,widthSize,heightSize,angleValue) {
		this.setCoverImage(coverImage);
		this.x = xPos;
		this.y = yPos;
		this.coverImage.position(this.x,this.y);
		this.width = widthSize;
		this.height = heightSize;
		this.coverImage.size(this.width,this.height);
		this.angle = angleValue;
		this.coverImage.inside = false;
	}

	setCoverImage(imagePath) {
		this.coverImage = createImg(imagePath);
		this.coverImage.style("background-position","center");
		this.coverImage.style("background-size","180px 280px");
		this.coverImage.mouseOver(this.isInside);
		this.coverImage.mouseOut(this.isOutside);
	}

	getCoverImage() {
		return this.coverImage;
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

	setAngle(newAngle) {
		this.angle = newAngle;
	}

	getAngle() {
		return this.angle;
	}

	update() {
		if (this.coverImage.inside && this.angle < 20) {
			this.angle += 2;
		} else if (!this.coverImage.inside && this.angle > 0) {
			this.angle -= 2;
		} else {
			return;
		}
		this.coverImage.size(this.width+(this.angle*1.8),this.height+(this.angle*3));
		this.coverImage.style("rotate",-this.angle);
	}

	isInside() {
		this.inside = true;
	}

	isOutside() {
		this.inside = false;
	}
}

class CategoryButton {
	constructor(categoryName,xPos,yPos,widthSize,heightSize,index) {
		this.x = xPos;
		this.y = yPos;
		this.width = widthSize;
		this.height = heightSize;
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
		this.categoryLabel.style("text-align","center");
		this.categoryLabel.style("font-family","Dosis");
		this.categoryLabel.style("font-size","40px");
		this.categoryLabel.style("font-weight","bolder");
		this.categoryLabel.style("background-image","url('Assets/category-app-"+index+".png')");
		this.categoryLabel.style("background-size","750px 250px");
		this.categoryLabel.style("background-position","0px 20px");
		this.categoryLabel.style("rotate",10);
	}

	getCoverImage() {
		return this.categoryLabel;
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

	setAngle(newAngle) {
		this.sizeValue = newAngle;
	}

	getAngle() {
		return this.sizeValue;
	}

	update() {
		if (this.categoryLabel.inside && this.sizeValue < 20) {
			this.sizeValue += 2;
		} else if (!this.categoryLabel.inside && this.sizeValue > 0) {
			this.sizeValue -= 2;
		} else {
			return;
		}
		this.categoryLabel.position(this.x,this.y-(this.sizeValue*3));
		this.categoryLabel.size(this.width+(this.sizeValue*1.8),this.height+(this.sizeValue*3));
	}

	isInside() {
		this.inside = true;
	}

	isOutside() {
		this.inside = false;
	}
}

function hideItens() {
	
}

function displayMenu() {
	switch(menu) {
		case 0:
			break;
		default:
			break;
	}
}

function setup() {
	angleMode(DEGREES);

	allZines = [];
	allCategories = [];
	currentZines = [];
	interfaceElements = [];

	appbackground = createP("");
	appbackground.position(0,0);
	appbackground.size(1080,1720);
	appbackground.style("background-image","url('Assets/background-app.png')");
	appbackground.style("background-size","1080px 1600px");
	appbackground.style("margin-top","0px");

	for(i=0;i<8;i++) {
		interfaceElements.push(new ZineDisplay("Assets/cover-"+(i%6)+".png",100+200*(i%4),200-100*(i%2)+300*int(i/4),180,280,0));
	}

	for(i=0;i<6;i++) {
		interfaceElements.push(new CategoryButton("Nome da Categoria",-50,1000+i*80,650,200-50*int(i/5),i%4));
	}

	credits = createP("<br><br><br><span style='font-weight:bolder;font-size:30px;'>Créditos</span><br>Equipe Art Lab");
	credits.position(560,1000);
	credits.size(520,700);
	credits.style("background-image","url('Assets/credits-app.png')");
	credits.style("background-size","600px 700px");
	credits.style("font-family","Dosis");
	credits.style("font-size","24px");
	credits.style("text-align","center");

	header = new AppHeader();
}

function draw() {
	for (var i = interfaceElements.length - 1; i >= 0; i--) {
		interfaceElements[i].update();
	}
}
class Zine {
	constructor(coverImage,pagesTag,nPages,name,author,description) {
		this.coverImage = coverImage;
		this.pagesTag = pagesTag;
		this.pagesNumber = nPages;
		this.name = name;
		this.author = author;
		this.description = description;
		this.categories = [];
	}

	setCoverImage(imagePath) {
		this.coverImage = imagePath;
	}

	getCoverImage() {
		return this.coverImage;
	}

	setPagesTag(newTag) {
		this.pagesTag = newTag;
	}

	getPagesTag() {
		return this.pagesTag;
	}

	setPagesNumber(newNumber) {
		this.pagesNumber = newNumber;
	}

	getPagesNumber() {
		return this.pagesNumber;
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

	findCategoryIndex(categoryName) {
		return this.categories.indexOf(categoryName);
	}

	removeCategory(index) {
		if (index < 0 || index >= this.categories.length)
			this.categories.splice(index,1);
	}

	getCategory(index) {
		return this.categories[index];
	}

	getAllCategories() {
		return this.categories;
	}
}

var allZines = [];

// "Banco de Zines" - informações da zine
let temp = new Zine("sand-man.jpg","Sandman",24,"Sand Man","Neil Gaiman","Suas histórias descrevem a vida de Sonho, o governante do Sonhar (o mundo dos sonhos) e sua interação com o universo, os homens e outras criaturas.");
temp.addCategory("Entreterimento");
temp.addCategory("Cultura");
allZines.push(temp);

temp = new Zine("tyci.png","Sandman",24,"TYCI - Zine 8","Frank","Esta zine fala tudo sobre conflitos criados no oeste asiático e a importância da mulher neste ambiente");
temp.addCategory("Educação");
temp.addCategory("Cultura");
allZines.push(temp);

temp = new Zine("freebeer.png","Sandman",24,"FREE BEER: The art fag issue","Ludirco","Nesta edição, falamos sobre as melhores exposições culturais que estão acontecendo durante a Oktoberfest");
temp.addCategory("Entreterimento");
temp.addCategory("Cultura");
allZines.push(temp);

temp = new Zine("escafandro.png","Retro Games Brasil",45,"Falmouthed Illustrators #2","Leo Gank","Na mais nova edição, destacamos novos artistas que têm como principal característica o humor negro");
temp.addCategory("Entreterimento");
allZines.push(temp);

temp = new Zine("cidade.png","Ação Games",57,"All Things Ordinary","Karter Johnson","Continuação da coletânea de poesias sobre as coisas simples da vida");
temp.addCategory("Entreterimento");
allZines.push(temp);

temp = new Zine("science.png","Retro Games Brasil",45,"She Blinded Me With Science","Pietro Jack","Autobiografia sobre como o autor encontrou suas duas paixões: a tecnologia e sua paixão");
temp.addCategory("Tecnologia");
temp.addCategory("Entreterimento");
allZines.push(temp);

temp = new Zine("heroi.jpg","Ação Games",57,"Ação Games","Editora Azul","Nesta edição, confira tudo sobre os herois da telinha arrasando em seus games");
temp.addCategory("Tecnologia");
temp.addCategory("Entreterimento");
temp.addCategory("Jogos");
allZines.push(temp);

temp = new Zine("rpg.jpg","Retro Games Brasil",45,"Retro Games Brasil","retrogamesbrasil.com","Confira tudo sobre os RPGs antigos de maior sucesso e nossas reviews sobre cada uma deles");
temp.addCategory("Tecnologia");
temp.addCategory("Entreterimento");
temp.addCategory("Jogos");
allZines.push(temp);

// Fim do "Banco de Zines"
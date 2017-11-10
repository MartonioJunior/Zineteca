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
		this.coverImage = imagePath;
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

var allZines = [];

// "Banco de Zines" - informações da zine

allZines.push(new Zine("doge.png","","Dog Zine: Zine of Dog","Peter Smith","Uma zine falando tudo sobre o melhor amigo do homem"));
allZines.push(new Zine("tyci.png","","TYCI - Zine 8","Frank","Esta zine fala tudo sobre conflitos criados no oeste asiático e a importância da mulher neste ambiente"));
allZines.push(new Zine("freebeer.png","","FREE BEER: The art fag issue","Ludirco","Nesta edição, falamos sobre as melhores exposições culturais que estão acontecendo durante a Oktoberfest"));
allZines.push(new Zine("escafandro.png","","Falmouthed Illustrators #2","Leo Gank","Na mais nova edição, destacamos novos artistas que têm como principal característica o humor negro"));
allZines.push(new Zine("cidade.png","","All Things Ordinary","Karter Johnson","Continuação da coletânea de poesias sobre as coisas simples da vida"));
allZines.push(new Zine("science.png","","She Blinded Me With Science","Pietro Jack","Autobiografia sobre como o autor encontrou suas duas paixões: a tecnologia e sua paixão"));

// Fim do "Banco de Zines"
class Critica{
	
	constrtuctor(bar, comentario,conjCalificaciones,email){
		this.comentario = comentario;
		this.bar = bar;
		this.calificaciones = conjCalificaciones;
		this.email = email

	}

	get comentario(){return this.comentario;}
	get bar(){return this.bar;}
	get calificaciones(){return this.calificaciones;}
	get usuario(){return this.email}

}
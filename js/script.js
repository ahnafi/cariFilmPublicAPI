function cariFilm(){
    $("#daftarFilm").html('');
    $.ajax({
        url : "https://www.omdbapi.com",
        type : "GET",
        dataType : "json",
        data :{
            'apikey':"3e25e055",
            's': $("#cariInput").val()
        },
        success : function(e){
           if(e.Response == "True"){
            	let movies = e.Search;
                $.each(movies,function(i,data){
                    $("#daftarFilm").append(`
                    <div class="col-md-6 col-lg-4  mt-2" >
                    <div class="card" >
                    <img src=" ${data.Poster} " class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">`+ data.Year+`</h6>
                        <a href="#" class="card-link see-detail" data-bs-toggle="modal"
                        data-bs-target="#exampleModal" data-id="`+ data.imdbID+`">Detail film</a>
                    </div>
                    </div>
                    </div>
                    `)
                });
                $("#cariInput").val('');
           }else {
            $("#daftarFilm").html(`
            <div>
            <h1 class="text-center">`+ e.Error +`</h1>
            </div>
            `)
           }
        }
        
    })
}

$("#cariBtn").on("click",function(){
    cariFilm();
})
$('#cariInput').on('keyup',function(e){
    if (e.keyCode === 13){
        cariFilm();
    }
})
$('#daftarFilm').on('click','.see-detail',function(){ 
    //kenapa see detailnya di dalam karena adanya dom bubling
   
    $.ajax({
        url : "https://www.omdbapi.com",
        type : "GET",
        dataType : "json",
        data :{
            'apikey':"3e25e055",
            'i' : $(this).data('id')
        },
        success : function(e){
            if(e.Response === "True"){
                $('.modal-body').html(`
                <!--  -->
                    <div class="container">
                    <div class="row">
                        <div class="col-lg-5 "><img class="img-fluid" src="${e.Poster}" alt="${e.Title}" /></div>
                        <div class="col-lg-7 mt-3 mt-sm-1 ms-auto">
                        <ul class="list-group">
                            <li class="list-group-item"><h3>Judul: ${e.Title} </h3></li>
                            <li class="list-group-item">Rilis: ${e.Released}</li>
                            <li class="list-group-item">Genre: ${e.Genre}</li>
                            <li class="list-group-item">Director: ${e.Director}</li>
                            <li class="list-group-item">Penulis: ${e.Writter}</li>
                            <li class="list-group-item">Actors: ${e.Actors}</li>
                            <li class="list-group-item">Bahasa: ${e.Language}</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    <!--  -->
                
                `)
            }
        } 
    })
})
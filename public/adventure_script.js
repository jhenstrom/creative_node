$(document).ready(function() 
{
    var hit_sound = document.createElement("audio");
    hit_sound.src = "stylesheets/fire.mp3";
    hit_sound.setAttribute("preload", "auto");
    hit_sound.setAttribute("controls", "none");
    hit_sound.style.display = "none";
    
    
    document.getElementById("left_x").style.visibility = "hidden";
    document.getElementById("right_x").style.visibility = "hidden";
    var myurl= "monster";
    var hit_points;
    var name;
    $.ajax({
            url: myurl,
            dataType: "json",
            success: function(parsed_json)
            {
                console.log(parsed_json);
                name = parsed_json['name'];
                hit_points = parsed_json['hit_points'];
                var everything = "<h1>Watch Out!</h1>";
                everything += "<h1><span class='name'>" + name + "</span> Appeared!</h1>";
                everything += "<h2>Hit Points</h2>";
                everything += "<h2 class='hit_points' id='hitPoints'>" + hit_points + "</h2>"
                $("#monster_div").html(everything);
        }
    })

    
    $("#cast_spell").click(function(e)
    {
       var value = $("#spell_search").val();
       console.log(value);
       e.preventDefault();
       var myurl = "spell?q=" + value;
       $.ajax({
           url:myurl,
           dataType: "json",
           success: function(parsed_json)
           {
               console.log(parsed_json);
               var this_url = parsed_json['results'][0]['url'];
               var pieces = this_url.split('/');
               value = pieces[pieces.length - 1];
                $.ajax({
                       url:"cast?q=" + value,
                       dataType: "json",
                       success: function(parsed_json)
                       {
                           console.log(parsed_json);
                           var level = parsed_json['level'];
                           var damage = 0;
                           for (var i = 0; i < level+1; i++)
                           {
                               var num = Math.floor((Math.random() * 6) + 1);
                               damage+=num;
                           }
                           hit_points = hit_points - damage;
                           var evrything = "<h2>You did <span class='red'>" + damage + "</span> Damage!</h2>"
                           if (hit_points < 0)
                           {
                               hit_points = 0;
                               evrything += "<h1>You have Defeated <span class='name'>" + name + "</span>!</h1>";
                               document.getElementById("left_x").style.visibility = "visible";
                               document.getElementById("right_x").style.visibility = "visible";
                           }
                           $("#damage").html(evrything);
                           var new_hit_points = hit_points;
                           $("#hitPoints").html(new_hit_points);
                           document.getElementById("fire").style.visibility = "visible";
                           hit_sound.play();
                           setTimeout(wait, 1000);
                       }
               });
           }
       });
    });
    
     $("#refresh").click(function(e)
    {
        document.location.reload();
        
    });
});

function wait()
{
    document.getElementById("fire").style.visibility = "hidden";
}
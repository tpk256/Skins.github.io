<? @include_once('set.php');

    $rs = mysql_query("SELECT * FROM items WHERE status ='0' ORDER BY price DESC");
    $counter = 0;
    echo '<span id="noitems"></span>';
    while($row = mysql_fetch_array($rs)) {
		$id = $row['assetid'];
        $price = $row['price'];
        $name = $row['name'];
        $img = $row['img'];
        if($price >= 250 && $price < 1000){
            $counter++;
            echo '<div class="item" id="'.$id.'-i"><span class="points" id="'.$id.'-p">'.$price.'pts</span>
                          <div id="'.$id.'" onclick="selectItem('.$id.')" class="img-holder"><img src="http://steamcommunity-a.akamaihd.net/economy/image/'.$img.'/360fx360f"></div><span class="name">'.$name.'</span>
                        </div>';
        }
    }
    
    if($counter == 0){
        echo '<br><br><br><center><h4>There is no items that fits the criteria.</h4></center><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>';
    }

?>
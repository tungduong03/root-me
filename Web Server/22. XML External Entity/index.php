<?php

echo '<html>';
echo '<header><title>XXE</title></header>';
echo '<body>';
echo '<h3><a href="?action=checker">checker</a>&nbsp;|&nbsp;<a href="?action=auth">login</a></h3><hr />';

if ( ! isset($_GET['action']) ) $_GET['action']="checker";

if($_GET['action'] == "checker"){

   libxml_disable_entity_loader(false);
   libxml_use_internal_errors(true);

   echo '<h2>RSS Validity Checker</h2>
   <form method="post" action="index.php">
   <input type="text" name="url" placeholder="http://host.tld/rss" />
   <input type="submit" />
   </form>';


    if(isset($_POST["url"]) && !(empty($_POST["url"]))) {
        $url = $_POST["url"];
        echo "<p>URL : ".htmlentities($url)."</p>";
        try {
            $ch = curl_init("$url");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_TIMEOUT, 3);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,0); 
            $inject = curl_exec( $ch );
            curl_close($ch);
            
            $string = simplexml_load_string($inject, null, LIBXML_NOENT);
            if ( ! is_object($string) || !$string || !($string->channel) || !($string->channel->item)) throw new Exception("error"); 

            foreach($string->channel->item as $row){
                print "<br />";
                print "===================================================";
                print "<br />";
                print htmlentities($row->title);
                print "<br />";
                print "===================================================";
                print "<br />";
                print "<h4 style='color: green;'>XML document is valid</h4>";
            }
        } catch (Exception $e) {
            print "<h4 style='color: red;'>XML document is not valid</h4>";
        }

    }
}

if($_GET['action'] == "auth"){
    echo '<strong>Login</strong><br /><form METHOD="POST">
    <input type="text" name="username" />
    <br />
    <input type="password" name="password" />
    <br />
    <input type="submit" />
    </form>
    ';
    if(isset($_POST['username'], $_POST['password']) && !empty($_POST['username']) && !empty($_POST['password']))
    {
        $user=$_POST["username"];
        $pass=$_POST["password"];
        if($user === "admin" && $pass === "".file_get_contents(".passwd").""){
            print "Flag: ".file_get_contents(".passwd")."<br />";
        }

    }

}


echo '</body></html>';
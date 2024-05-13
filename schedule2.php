<?php
$strUsername = $_POST["username"];
$day = $_POST["day"];
$events = "";

// Define Max Velocity's race schedule based on the day
if ($day == "monday" || $day == "Monday"){
    $events = "<br>Physical Training<br>Simulator Session<br>Team Meeting";
}
else if ($day == "tuesday" || $day == "Tuesday"){
    $events = "<br>Media Interviews<br>Technical Briefing<br>Strategy Planning";
}
else if ($day == "wednesday" || $day == "Wednesday"){
    $events = "<br>Car Setup Testing<br>Meeting with Engineers<br>Physical Fitness";
}
else if ($day == "thursday" || $day == "Thursday"){
    $events = "<br>Track Walk<br>Media Engagement<br>Technical Debrief";
}
else if ($day == "friday" || $day == "Friday"){
    $events = "<br>Practice Sessions<br>Qualifying Simulation<br>Team Dinner";
}
else if ($day == "saturday" || $day == "Saturday"){
    $events = "<br>Final Practice<br>Qualifying Session<br>Strategy Meeting";
}
else if ($day == "sunday" || $day == "Sunday"){
    $events = "<br>Race Day!<br>Driver's Parade<br>Post-Race Analysis";
}

// Output the schedule
echo "<h2>Hello " . $strUsername . "!</h2>";
echo "<br>";
echo "The following events are planned for " . $day . ":";
echo $events;
?>

application: juliawebpage
version: 1

$("#mapDiv").append(googleMap);


#carousel{
  width: 100%;
  height: 100px;
  position: absolute;
  transform-style: preserve-3d;
  animation: rotation 20s infinite linear;
}
#carousel:hover{
  animation-play-state: paused;
}
#carousel figure{
  display: block;
  position: absolute;
  width: 90%;
  height: 100px;
  left: 10px;
  top: 10px;
  background: black;
  overflow: hidden;
  border: solid 5px black;
}

img{
  -webkit-filter: grayscale(1);
  cursor: pointer;
  transition: all .5s ease;
}
img:hover{
  -webkit-filter: grayscale(0);
  transform: scale(1.2,1.2);
}

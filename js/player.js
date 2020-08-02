var player = null;
var paused = false;
var buttonsVisible = false;
var hideButtonsTimeout = null;
var videoPlayer = null;

window.onload = function() {
	init();
}

function init() {
    var url = getUrl();

    setTimeout(function() {
        videoPlayer = getElementById('videoPlayer');

        var options = {
            preload: 'auto',
            autoplay: true,
            muted: false,
            fluid: true
        };

        player = videojs('videoPlayer', options, function onPlayerReady() {
            player.src({type: streamType, src: url});

            player.ready(function() {
                videojs.log('Player is ready!');

                this.play();
            });

            this.on('ended', function() {
                videojs.log('Video end!');
            });

            this.on('pause', function () {
                videojs.log('Video paused!');
            });
            
            this.on('play', function () {
                videojs.log('Video play!');
            });

            this.on('error', function() {
                videojs.log('Error loading video!');
            });
        });
    }, 0);

    // add eventListener for keydown
	document.addEventListener('keydown', function(e) {
        var keyCode = e.keyCode;
        var activeElement = document.activeElement.id;

        var playPauseButton = getElementById('playPauseButton');
        var backButton = getElementById('backButton');

        if (keyCode === UP) {
            //UP arrow
            if (activeElement !== 'playPauseButton' && activeElement !== 'backButton') {
                if (playPauseButton) {
                    playPauseButton.focus();
                }
            }
			else if (activeElement === 'playPauseButton') {
                if (backButton) {
                    backButton.focus();
                }
            }
        }
        else if (keyCode === DOWN) {
			//DOWN arrow
            if (activeElement === 'playPauseButton') {
                if (videoPlayer) {
                    videoPlayer.focus();
                }
            }
            else if (activeElement === 'backButton') {
                if (playPauseButton) {
                    playPauseButton.focus();
                }
            }
		}
        else if (keyCode === OK) {
            //OK button
            if (!buttonsVisible) {
                // Show buttons
                showButtons();
    
                // Hide buttons automatically after 6 seconds
                hideButtonsTimeout = setTimeout(function() {
                    if (!paused) {
                        hideButtons();
                    }
                }, 6000);
            }
            else {
                if (activeElement === 'playPauseButton') {
                    if (!paused) {
                        setPlayPauseButtonIcon(playIcon);

                        if (player) {
                            player.pause();
                            setPaused(true);
                        } 
                    }
                    else {
                        setPlayPauseButtonIcon(pauseIcon);

                        if (player) {
                            player.play();
                            setPaused(false);
                            hideButtons();
                        } 
                    }
                    
                    clearTimeout(hideButtonsTimeout);
                }
                else if (activeElement === 'backButton') {
                    exitFromPlayer();
                }

            }
        }
        else if (keyCode === RETURN || keyCode === ESC) {
            // RETURN button
            if (buttonsVisible) {
                hideButtons();
            }
            else {
                exitFromPlayer();
            }   
        }
    });
}

function getUrl() {
    return sessionStorage.getItem('urlToPlay');
}

function getType() {
    return sessionStorage.getItem('urlType');
}

function exitFromPlayer() {
    if (player) {
        player.dispose();
    }
    window.open(mainPage, _self);
}

function showButtons() {
    var playPauseButton = getElementById('playPauseButton');
    var backButton = getElementById('backButton');

    if (playPauseButton && backButton) {
        playPauseButton.style.display = 'inline-block';
        backButton.style.display = 'inline-block';
        buttonsVisible = true;
    }
}

function hideButtons() {
    var playPauseButton = getElementById('playPauseButton');
    var backButton = getElementById('backButton');

    if (playPauseButton && backButton) {
        playPauseButton.style.display = 'none';
        backButton.style.display = 'none';
        buttonsVisible = false;
    }
}

function setPaused(value) {
    paused = value;
}

function setPlayPauseButtonIcon(icon) {
    var playPauseIcon = getElementById('playPauseIcon');
    if (playPauseIcon) {
        playPauseIcon.data = icon;
    }
}

function getElementById(element) {
    return document.getElementById(element);
}



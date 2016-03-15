(function() {
	function SongPlayer() {
		var SongPlayer = {};
		/**
		* @desc current song
		* @type {Object}
		*/
		var currentSong = null;

		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
		};

		/**
		* @function playSong
		* @desc Plays passed in song object
		* @param {Object} song
		*/
		function playSong(song){
			if (currentBuzzObject){
				currentBuzzObject.play();
				song.playing = true;
			}
		}

		/**
		* @function SongPlayer.play
		* @desc Method to start playing song
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playsong(song);
				}
			}
		};

		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
		};

		/**
		* @function playSong
		* @desc plays the current currentBuzzObject()
		* @param {Object} song
		*/


		return SongPlayer;
	}

	angular
	.module('blocJams')
	.factory('SongPlayer', SongPlayer);
})();

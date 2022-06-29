(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.stopbutton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("AEn1vIJPAAMAAAArfIpPAAgAt11vII6AAMAAAArHIo6AAg");
	this.shape.setTransform(-0.375,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#99CC00").s().p("AEnVwMAAAgrfIJPAAMAAAArfgAt1VXMAAAgrGII6AAMAAAArGg");
	this.shape_1.setTransform(-0.375,0);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AEnVwMAAAgrfIJPAAMAAAArfgAt1VXMAAAgrGII6AAMAAAArGg");
	this.shape_2.setTransform(-0.375,0);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF6600").s().p("AEnVwMAAAgrfIJPAAMAAAArfgAt1VXMAAAgrGII6AAMAAAArGg");
	this.shape_3.setTransform(-0.375,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-89.9,-140.2,179.10000000000002,280.4);


(lib.playbutton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("AVOAAMgqaAYgMgABgw/g");
	this.shape.setTransform(34.25,-0.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#99CC00").s().p("A1N4eMAqbAYeMgqaAYfg");
	this.shape_1.setTransform(34.25,-0.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("A1N4eMAqbAYeMgqaAYfg");
	this.shape_2.setTransform(34.25,-0.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF6600").s().p("A1N4eMAqbAYeMgqaAYfg");
	this.shape_3.setTransform(34.25,-0.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF6633").s().p("A1N4eMAqbAYeMgqaAYfg");
	this.shape_4.setTransform(34.25,-0.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape}]},1).to({state:[{t:this.shape_4},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-102.5,-158.7,273.5,315.5);


(lib.bugleg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#663300").ss(34,1,1).p("Ao+2VIR9WzIxBV4");
	this.shape.setTransform(345.5,11.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#663300").ss(34,1,1).p("AqX0KIUuRNIrMXI");
	this.shape_1.setTransform(354.35,-2.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#663300").ss(34,1,1).p("ArvyAIXfLmIlYYb");
	this.shape_2.setTransform(363.225,-16.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#663300").ss(34,1,1).p("AtWv2IaQGAIAdZt");
	this.shape_3.setTransform(373.5,-30.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#663300").ss(34,1,1).p("AxptsIdCAaIGRa/");
	this.shape_4.setTransform(401,-44.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#66330A").ss(34,1,1).p("AuQvaIa3E2IBqZ/");
	this.shape_5.setTransform(379.25,-33.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#663314").ss(34,1,1).p("AsVxJIYrJTIi+ZA");
	this.shape_6.setTransform(367.025,-22.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#66331F").ss(34,1,1).p("ArPy4IWfNxInlYA");
	this.shape_7.setTransform(360.075,-11.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#663329").ss(34,1,1).p("AqK0mIUVSNIsNXA");
	this.shape_8.setTransform(353.125,-0.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#663300").ss(34,1,1).p("ApErUISJWp");
	this.shape_9.setTransform(346.175,-59.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#663333").ss(34,1,1).p("AIbrAIw1WA");
	this.shape_10.setTransform(350.425,83.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_10},{t:this.shape_9}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(271,-149,260,320);


(lib.bugbody = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#663333").ss(1,1,1).p("EAv4gDrIKMlNIhkleIC+GaIrBFqEAitAHwQBOA0AZA6Qg4g4gvg2gEghHAAiIcEPoIAAAAEghIAAiIABAAUA6eAA/AJWAGPEgv/AAYQAAAAAAAAIALAKINGLrEgv0AAiQHrAEHBgEEgv/AAYQHzADHEAHEAwdADbIANAHIIvEeIhkFeIC+maIqAlJIgWgMEAv4AESIAmATIAfAQEAw1AE/IAIAEEghHAAiIdSwrEghHAAiUAyFgAdARygHTQnjGSHgIsEgv/AAYISEtdEg7dAAXIABAAQF6gBFjACEg7cAAXQF/AIFpAD");
	this.shape.setTransform(375.4375,2.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#663333").ss(9,1,1).p("EAoEgHXQHZg8DhCMQACABACABQBZA5AxBZQAQAcALAfQACAEABADQAEALADAMQAXBNABBeQABAzgCAuAAQQBQkxgTlcgmQrHhOoVh2QpLiClyizQp9k0ALiNQABgOAJgNQBaiIK3ldQGhjSKliJQHDhcI2g8QFTgkE5gIQPpgaL1D+QHQCcD4C6EA1+ADaQgFAjgHAgQhHFIkkgSQkngTh4AVQgnAHgUAMQhSAtjMBKQjMBKoRCIQovCPvyg/");
	this.shape_1.setTransform(341.3957,3.8149);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#990000").ss(9,1,1).p("AAAAAIAAAA");
	this.shape_2.setTransform(597.7875,-43.3625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#663333").s().p("EA5ZAIdIovkeIgNgHIAAhsIAAAAIAWALIKAFJIi+GbgEgxrAH0Qp8k0AKiNQACgPAIgNQBbiHK3ldQGhjSKliJIyENdQljgCl6AAIgBAAIABAAQF/AIFpAEINGLqQpLiClyizgEghHAA/UAyFgAeARygHTQnjGSHgItUgJWgGPg6egA/gEAwWgCMIgDgHQgMgfgPgcIKMlNIhkleIC+GZIrBFrIgHgXg");
	this.shape_3.setTransform(375.4283,0.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#666600").s().p("AAQQBIAAAAI8DvnIcDPnQkxgTlcgmQrIhOoVh2ItGrqIAeAAQDsACDkAAIAAAAIAAAAQDkAADbgCQnFgInzgCIAAAAISEtdQHDhcI2g8QFTgkE5gII9RQrUA6fAA/AJVAGPQAvA2A4A3QgZg5hOg0QngotHjmSQHZg8DhCMIAEACQBZA5AxBZQAPAcAMAfIADAHIAHAXQAXBNABBeQABAzgDAuIgWgLIAAAAIAABsIANAHQgFAjgHAgIgmgUIAmAUQhHFIkkgSQkogTh3AVQgnAHgVAMQhSAtjLBKQjMBKoRCIQmFBkpeAAQkKAAk1gUgA7zAaIAAAAgEAoBAHoQBOA0AZA5Qg4g3gvg2gEAoBAHoIAAAAgEgiyAAcQjkAAjsgCIgeAAIgLgKQHzACHFAIQjbACjkAAIAAAAIAAAAgABewRQPpgaL0D+QHRCcD4C6IAAAAUgRyAHUgyFAAdgA7zAaIAAAAgEg2IAAOQF6AAFjACIAAAAIALAKQlpgEl/gIgEgqrAAQIAAAAgEgqrAAQIAAAAgABewRg");
	this.shape_4.setTransform(341.4174,3.8149);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.6,-105.1,766.6,217.89999999999998);


(lib.backbutton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("A1I0EIGQAAMAAAAoJImQAAgAtUgLMAidgT5MAAAAnxg");
	this.shape.setTransform(-0.75,3.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#99CC00").s().p("A1HUFMAAAgoJIGPAAMAAAAoJgAtUgLMAicgT5MAAAAnxg");
	this.shape_1.setTransform(-0.75,3.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("A1HUFMAAAgoJIGPAAMAAAAoJgAtUgLMAicgT5MAAAAnxg");
	this.shape_2.setTransform(-0.75,3.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF6600").s().p("A1HUFMAAAgoJIGPAAMAAAAoJgAtUgLMAicgT5MAAAAnxg");
	this.shape_3.setTransform(-0.75,3.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-137,-126.2,272.5,259);


(lib.wholebug = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.bugleg("synched",0);
	this.instance.setTransform(-36,-59.45,0.8596,0.8661,0,165.1289,-15.1247,287.9,-131.8);

	this.instance_1 = new lib.bugleg("synched",9);
	this.instance_1.setTransform(248.65,-232.6,0.8591,0.8667,0,180,0,400.9,11);

	this.instance_2 = new lib.bugleg("synched",4);
	this.instance_2.setTransform(351.25,-102.2,0.8599,0.8658,0,160.1749,-20.1481,288.2,-131.9);

	this.instance_3 = new lib.bugleg("synched",6);
	this.instance_3.setTransform(345.9,108.8,0.8593,0.8665,0,-8.8731,-9.0277,288.1,-131.9);

	this.instance_4 = new lib.bugleg("synched",2);
	this.instance_4.setTransform(174.3,115.65,0.86,0.8658,0,20.0587,20.3861,287.9,-131.9);

	this.instance_5 = new lib.bugleg("synched",7);
	this.instance_5.setTransform(-42.05,58.3,0.8592,0.8665,0,-7.9112,-8.051,288,-131.9);

	this.instance_6 = new lib.bugbody("synched",0);
	this.instance_6.setTransform(157.95,0.05,1,1,0,0,0,290.4,1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5,p:{regX:288,scaleX:0.8592,scaleY:0.8665,skewX:-7.9112,skewY:-8.051,x:-42.05,y:58.3,startPosition:7}},{t:this.instance_4,p:{regX:287.9,regY:-131.9,scaleX:0.86,scaleY:0.8658,skewX:20.0587,skewY:20.3861,x:174.3,y:115.65,startPosition:2}},{t:this.instance_3,p:{regX:288.1,scaleX:0.8593,scaleY:0.8665,skewX:-8.8731,skewY:-9.0277,x:345.9,y:108.8,startPosition:6}},{t:this.instance_2,p:{regX:288.2,scaleX:0.8599,scaleY:0.8658,skewX:160.1749,skewY:-20.1481,x:351.25,y:-102.2,startPosition:4}},{t:this.instance_1,p:{regY:11,scaleX:0.8591,scaleY:0.8667,x:248.65,y:-232.6}},{t:this.instance,p:{scaleX:0.8596,scaleY:0.8661,skewX:165.1289,skewY:-15.1247,x:-36,y:-59.45,startPosition:0}}]}).to({state:[{t:this.instance_6},{t:this.instance_5,p:{regX:287.9,scaleX:0.8317,scaleY:0.8624,skewX:-7.6895,skewY:-8.2826,x:-15.6,y:58.05,startPosition:9}},{t:this.instance_4,p:{regX:288,regY:-131.8,scaleX:0.835,scaleY:0.8592,skewX:19.5332,skewY:20.9311,x:172.2,y:108.15,startPosition:9}},{t:this.instance_3,p:{regX:288.2,scaleX:0.8319,scaleY:0.8622,skewX:-8.6231,skewY:-9.287,x:348.6,y:104.55,startPosition:9}},{t:this.instance_2,p:{regX:288.1,scaleX:0.8348,scaleY:0.8593,skewX:160.6963,skewY:-20.6894,x:344.15,y:-97.3,startPosition:9}},{t:this.instance_1,p:{regY:11.1,scaleX:0.8311,scaleY:0.863,x:265.6,y:-224.65}},{t:this.instance,p:{scaleX:0.8333,scaleY:0.8609,skewX:165.5332,skewY:-15.5455,x:-9.75,y:-59.2,startPosition:9}}]},9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-142,-371.1,766.6,738.5);


// stage content:
(lib.bug_HTML5Canvas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,27,49];
	this.streamSoundSymbolsList[27] = [{id:"bug1",startFrame:27,endFrame:60,loop:1,offset:0}];
	this.streamSoundSymbolsList[49] = [{id:"bug2",startFrame:49,endFrame:60,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		this.playbutton.addEventListener("click",f1.bind(this));
		function f1(args){this.play();}
		
		this.stopbutton.addEventListener("click",f2.bind(this));
		function f2(args){this.stop();}
		
		this.backbutton.addEventListener("click",f3.bind(this));
		function f3(args){this.gotoAndStop(0);}
		playSound("jukletit28685");
	}
	this.frame_27 = function() {
		var soundInstance = playSound("bug1",0);
		this.InsertIntoSoundStreamData(soundInstance,27,60,1);
	}
	this.frame_49 = function() {
		var soundInstance = playSound("bug2",0);
		this.InsertIntoSoundStreamData(soundInstance,49,60,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(27).call(this.frame_27).wait(22).call(this.frame_49).wait(11));

	// buttons
	this.backbutton = new lib.backbutton();
	this.backbutton.name = "backbutton";
	this.backbutton.setTransform(628.65,569.2,0.3457,0.3457);
	new cjs.ButtonHelper(this.backbutton, 0, 1, 2, false, new lib.backbutton(), 3);

	this.stopbutton = new lib.stopbutton();
	this.stopbutton.name = "stopbutton";
	this.stopbutton.setTransform(509.4,574.3,0.3537,0.3537);
	new cjs.ButtonHelper(this.stopbutton, 0, 1, 2, false, new lib.stopbutton(), 3);

	this.playbutton = new lib.playbutton();
	this.playbutton.name = "playbutton";
	this.playbutton.setTransform(392.7,572.9,0.325,0.325);
	new cjs.ButtonHelper(this.playbutton, 0, 1, 2, false, new lib.playbutton(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.playbutton},{t:this.stopbutton},{t:this.backbutton}]}).wait(60));

	// morons
	this.instance = new lib.wholebug();
	this.instance.setTransform(849,609.7,0.0744,0.0955,75.0043,0,0,240.8,6.3);

	this.instance_1 = new lib.wholebug();
	this.instance_1.setTransform(896,253.6,0.1224,0.1224,0,-30.0035,149.9965,241.2,7);

	this.instance_2 = new lib.wholebug();
	this.instance_2.setTransform(180.05,570.65,0.2022,0.1819,-45,0,0,241.2,7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(60));

	// layer2
	this.instance_3 = new lib.wholebug();
	this.instance_3.setTransform(-134.6,29.8,0.1651,0.1665,0,0,0,241.1,6.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({guide:{path:[-134.5,29.9,623.2,108.2,1380.9,186.5,1384,186.5,1387.2,186.5,1397.4,196.9,1399.6,209.7,1400.5,215.4,1402.1,221.1,1403.6,226.4,1404,231.9,1404.4,237.4,1404.4,242.8,1404.4,249.1,1402.4,254.7,1398.2,266.3,1393.5,277.5,1387.4,292,1379,305.2,1373.2,314.2,1363.5,319.2,1325.5,339,1282.1,343,1190.5,351.5,1099.2,362.2,1028,370.4,956.6,374.2,876.9,378.4,799.2,364.5,741.8,354.3,684,349,599.1,341.2,516.3,323.3,342.7,285.9,164.5,285.8,88.9,285.7,14.5,298,-26.1,304.7,-67.4,310.3,-101.2,314.9,-134.5,325.8,-152.7,345.5,-168,367.2,-175.1,377.2,-182.5,387.2,-188.5,395.4,-193,404.4,-197.1,412.6,-199.9,421.3,-202.6,429.8,-204.2,438.6,-209.3,465.7,-208.9,493.2,-208.5,523.3,-199.1,551.3,-192,572.8,-179.8,591.8,-160.6,622,-129.1,640.4,-95.5,660.1,-59.5,675.2,-16.3,693.2,30,697.9,78.8,702.9,126.7,713.7,190.2,728.1,255.3,733.1,368.6,741.9,482.5,737.8,539.5,735.8,596.5,733.8,637.3,732.4,678,726.8,820,707.3,961,682.6,997.9,676.2,1034.8,669.3,1056,665.3,1077.2,660.7,1106.4,654.2,1133.2,639.5,1149.7,630.5,1166.5,621.8,1178.9,615.3,1191.3,608.8,1200.7,603.8,1210.3,599.7,1213.4,599.7,1216.5,599.7,1268.9,572.3,1321.4,544.9,1327.6,544.9,1333.9,544.9], orient:'fixed'}},59).wait(1));

	// smallbug
	this.instance_4 = new lib.wholebug();
	this.instance_4.setTransform(1389.25,484.2,0.101,0.101,0,0,180,241.1,7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:240.5,regY:6.9,skewX:47.2167,skewY:227.2167,guide:{path:[1389.2,484.2,1321.9,521.9,1244.2,521.7,1166.3,521.5,1095.4,494.1,1057.2,479.3,1018.6,467.9,954.9,449,888.1,444.4,849.8,441.8,812.5,434.2,791.9,430.1,771.6,424.4,754.9,419.7,738.4,414,668.2,389.7,608.4,339.9,607.4,339.4,606.4,339], orient:'fixed'}},29).to({regY:6.8,skewX:153.6324,skewY:333.6324,guide:{path:[606.4,339,607.4,339.4,608.4,339.9,617,347.1,625.9,353.8], orient:'fixed'}},5).to({regX:240.4,regY:6.7,skewX:219.8987,skewY:399.8987,guide:{path:[625.9,353.8,617,347.1,608.4,339.9], orient:'fixed'}},5).to({regX:241.1,regY:7,skewX:180,skewY:360,guide:{path:[608.4,339.9,668.2,389.7,738.4,414,811.1,439.1,888.1,444.4,954.9,449,1018.6,467.9,1057.2,479.3,1095.4,494.1,1166.3,521.5,1244.2,521.7,1322.5,521.9,1390.2,483.7], orient:'fixed'}},20).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(375.4,326.9,1089,469.9);
// library properties:
lib.properties = {
	id: '2A5F0E7F5AA7AF4EB249CEADCC14E57D',
	width: 1280,
	height: 720,
	fps: 10,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"sounds/bug1.mp3?1648832442896", id:"bug1"},
		{src:"sounds/bug2.mp3?1648832442896", id:"bug2"},
		{src:"sounds/jukletit28685.mp3?1648832442896", id:"jukletit28685"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['2A5F0E7F5AA7AF4EB249CEADCC14E57D'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
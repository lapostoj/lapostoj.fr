jQuery(document).ready(function(event){
	var cards = $('.card'),
		closeButtons = $('.card-close-button');
		
	education = cards.eq(0);
	experience = cards.eq(1);
	closeEducation = closeButtons.eq(0);
	closeExperience = closeButtons.eq(1);

	education.on('click', '.single-item', function(){
		var selectedItem = $(this);
		//open project
		selectedItem.addClass('selected');
		education.add(closeEducation).addClass('project-open');
	});
	
	closeEducation.on('click', function(){
		if(closeEducation.hasClass('project-open')) {
			//close project
			education.removeClass('project-open').find('.selected').removeClass('selected').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$(this).children('.card-item-details').scrollTop(0);
			});
			closeEducation.removeClass('project-open');
		}
	});

	experience.on('click', '.single-item', function(){
		var selectedItem = $(this);
		//open project
		selectedItem.addClass('selected');
		experience.add(closeExperience).addClass('project-open');
	});
	
	closeExperience.on('click', function(){
		if(closeExperience.hasClass('project-open')) {
			//close project
			experience.removeClass('project-open').find('.selected').removeClass('selected').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$(this).children('.card-item-details').scrollTop(0);
			});
			closeExperience.removeClass('project-open');
		}
	});
});
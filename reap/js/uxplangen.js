var filters = [];
function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

$(document).ready(function() {
	var uxplan = store.get('uxplan');
	var title = store.get('title');

	if(title) {
		$('.js-title').val(title);
	}

	if(!uxplan) {
		uxplan = {};
	}
	else {
		$('.js-ux-list .ux-activity').each(function(){
			if(uxplan[$(this).find('h3').html()]) {
				$(this).addClass('checked');
			}
		});
	}

	$('.js-add-btn').click(function() {
		//var activity = $(this).closest('.ux-activity').clone();
		var title = $(this).closest('.ux-activity').find('h3').html();
		
		var dups = false;
		if($('.js-ux-plan .ux-activity').length > 0) {
			$('.js-ux-plan .ux-activity h3').each(function() {
				if(title == $(this).html()) {
					dups = true;
				}
			});
		}

		if(!dups) {
			//activity.appendTo('.js-ux-plan');
			activity = $(this).closest('.ux-activity');
				
			if($(this).closest('.ux-activity').hasClass('checked')) {
				delete uxplan[activity.find('h3').html()];
				activity.removeClass('checked');
			}
			else {
				uxplan[activity.find('h3').html()] = activity.find('h3').html();
				activity.addClass('checked');
			}
		}
		//todo: deduplicate entries
		//uxplan = removeDups(uxplan);
		store.set('uxplan', uxplan);
	});

	$(".js-search").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
	    $(".js-ux-list .js-activity-wrapper").filter(function() {
	      $(this).toggle($(this).find('h3').html().toLowerCase().indexOf(value) > -1);
	    });
	  });

	/*$('.js-category').change(function() {
		var value = $(this).val().toLowerCase();
		$(".js-ux-list .ux-activity").filter(function() {
	      $(this).toggle($(this).find('.type').html().toLowerCase().indexOf(value) > -1);
	    });
	});*/

	$('.js-title').focusout(function() {
		var value = $(this).val();
		store.set('title', value);
	});

	$('.js-view-plan').click(function() {
		$('.js-ux-list .js-activity-wrapper').each(function() {
			if($(this).find('.ux-activity').hasClass('checked')) {
				$(this).show();
			}
			else {
				$(this).hide();
			}
		});
	});

	$('.js-view-all').click(function() {
		$('.js-ux-list .js-activity-wrapper').each(function() {
			$(this).show();
		});
	});

	$('.js-reset-plan').click(function() {
		uxplan = {};
		store.remove('uxplan');
		$('.js-ux-plan').html('');
		$('.js-ux-list .js-activity-wrapper').each(function(){
			$(this).find('.ux-activity').removeClass('checked');
		});
	});

	$('.js-print-page').click(function() {
		window.print();
	});

	$('.js-category li.list-group-item').click(function() {
        var value = $(this).attr('value');
        if($(this).hasClass('list-group-item-primary')) {
            
            filters.push(value);
            
        }
        else {
            filters.remove(value);
        }
        filterItems();
    });

	//todo: 

});

function filterItems() {
	$(".js-ux-list .js-activity-wrapper").hide();

	if(filters.length == 0 || filters.length == 4) {
        $(".js-ux-list .js-activity-wrapper").show();
        return;
    }

	$(".js-ux-list .js-activity-wrapper").each(function() {
		for(var i=0;i<filters.length;i++) {
      		if($(this).find('.type').html().toLowerCase().indexOf(filters[i]) > -1) {
      			$(this).show();
      			break;
      		}
  		}
    });
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

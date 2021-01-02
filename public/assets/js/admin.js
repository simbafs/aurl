jQuery(document).ready(function () {
    jQuery('#adminTable').DataTable();
    jQuery('td a span').each(function(a, v){
        let item = jQuery(this);
        if (item.text().length>50){
            item.text(item.text().slice(0, 47) + '...');
        }
	});
    jQuery('#adminTable').on('page.dt', function(){
        setTimeout(function(){
            jQuery('td a span').each(function(a, v){
                let item = jQuery(this);
                if (item.text().length>50){
                    item.text(item.text().slice(0, 47) + '...');
                }
            });
        }, 100);
    });
});
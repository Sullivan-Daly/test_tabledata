$(document).ready(function() {

//    $('#noktable tfoot th').each( function () {
//        var noktitle = $(this).text();
//        $(this).html( '<input type="text" placeholder="Search '+noktitle+'" />' );
//    } );

    var noktable = $('#noktable').DataTable
    ({
        "serverSide": true,
        "dom": '<"top">rt<"bottom"iB><"clear">',
        "ajax": {
            "url": "get_nok"
        },
        "columns":
        [
            { "data": "date" },
            { "data": "user" },
            { "data": "id" },
            { "data": "text" }
        ],
        buttons:
        [
            {
                text: 'CANCEL',
                key: 'n',
                action: function () {
                    if (this.rows({selected: true})) {
                        var tmp = this.rows({selected: true}).data().toArray();
                        tmp.forEach(
                            function(element) {
                                console.log(element['id']);
                                $.ajax({"url": "save_element", "type": "post",
                                "data": { 'id_str' : element['id'], 'value' : 0}, dataType : 'json'})
                            }
                        )
                        nok_selection()
                    }
                    else
                    {
                        $(this).dataTable.ajax.reload()
                    }
                }
            },
            'colvis'
        ],
        "scrollY":        "380px",
        "scrollCollapse": true,
        "scroller": {
            "loadingIndicator": true,
            displayBuffer: 50
        },
        "select":         true
    });

    $('#noktable').DataTable().columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    });



//    $('#oktable tfoot th').each( function () {
//    var oktitle = $(this).text();
//    $(this).html( '<input type="text" placeholder="Search '+oktitle+'" />' );
//    } );

    var oktable = $('#oktable').DataTable
    ({
        "serverSide": true,
        "dom": '<"top">rt<"bottom"iB><"clear">',
        "ajax": {
            "url": "get_ok"
        },
        "columns":
        [
            { "data": "date" },
            { "data": "user" },
            { "data": "id" },
            { "data": "text" }
        ],
        buttons:
        [
            {
                text: 'CANCEL',
                key: 'n',
                action: function () {
                    if (this.rows({selected: true})) {
                        var tmp = this.rows({selected: true}).data().toArray();
                        tmp.forEach(
                            function(element) {
                                console.log(element['id']);
                                $.ajax({"url": "save_element", "type": "post",
                                "data": { 'id_str' : element['id'], 'value' : 0}, dataType : 'json'})
                            }
                        )
                        ok_selection()
                    }
                }
            },
            'colvis'
        ],
        "scrollY":        "380px",
        "scrollCollapse": true,
        "scroller": {
            "loadingIndicator": true,
            displayBuffer: 50
        },
        "select":         true
    });

    $('#oktable').DataTable().columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    });

    $('#tweettable tfoot th').each( function () {
        var tweettitle = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+tweettitle+'" />' );
    } );


    var tweettable = $('#tweettable').DataTable
    ({
        "serverSide": true,
        "keys": true,
        "dom": '<"top">rt<"bottom"iB><"clear">',
        "ajax": {
            "url": "get_tweets"
        },
        buttons: [
            {
                text: 'OK',
                key: 'n',
                action: function () {
                    if (this.rows({selected: true})) {
                        var tmp = this.rows({selected: true}).data().toArray();
                        tmp.forEach(
                            function(element) {
                                console.log(element['id']);
                                $.ajax({"url": "save_element", "type": "post",
                                "data": { 'id_str' : element['id'], 'value' : 1}, dataType : 'json'})
                            }
                        )
                        ok_selection()
                    }
                }
            },
            {
                text: 'NOK',
                key: 'n',
                action: function () {
                    if (this.rows({selected: true})) {
                        var tmp = this.rows({selected: true}).data().toArray();
                        tmp.forEach(
                            function(element) {
                                console.log(element['id']);
                                $.ajax({"url": "save_element", "type": "post",
                                "data": { 'id_str' : element['id'], 'value' : -1}, dataType : 'json'})
                            }
                        )
                        nok_selection()
                    }
                }
            },
            'colvis'
        ],
        "columns":
        [
            { "data": "date" },
            { "data": "user" },
            { "data": "id" },
            { "data": "text" }
        ],
        "scrollY":        "380px",
        "scrollCollapse": true,
        "scroller": {
            "loadingIndicator": true,
            displayBuffer: 50
        },
        "select":         true
    });


    $('#tweettable').DataTable().columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    });


    function ok_selection (){
        setTimeout(function () {
            oktable.ajax.reload()
            tweettable.ajax.reload()
        }, 1000);
    }

    function nok_selection (){
        setTimeout(function () {
            noktable.ajax.reload()
            tweettable.ajax.reload()
        }, 1000);
    }


    var notificationTables = $('.notifications_list_table').dataTable( {
        /* initialization parameters */
    });

/////////////////////////////////////////////////////////////////////////////


    $('#scrollertable').DataTable
    ({
        "serverSide": true,
        "ajax": {
            "url": "test_ajax"
        },
        "dom": '<"top">rt<"bottom"ir><"clear">',
        "columns":
        [
            { "data": "date" },
            { "data": "user" },
            { "data": "id" },
            { "data": "text" }
        ],
        // "dom": '<"top"l>rt<"bottom"ip><"clear">',

        // "sDom": "frti",
        // "deferRender":    true,
        "scrollY":        '800px',
        // "scrollCollapse": true,
        "scroller": {
            "loadingIndicator": true,
            displayBuffer: 50
        },
        "select":         true
        // "ordering": false,
        // "searching": false,
        // "processing": true
    });


});
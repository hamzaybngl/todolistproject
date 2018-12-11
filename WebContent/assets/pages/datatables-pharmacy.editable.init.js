/**
* Theme: Adminto Admin Template
* Author: Coderthemes
* Component: Editable
* 
*/

(function( $ ) {

	'use strict';

	var EditableTable = {
		
		options: {
			addButton: '#addToTable',
			table: '#datatable-editable-pharmacy',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm',
			}
		},

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			this.$table				= $( this.options.table );
			this.$addButton			= $( this.options.addButton );

			// dialog
			this.dialog				= {};
			this.dialog.$wrapper	= $( this.options.dialog.wrapper );
			this.dialog.$cancel		= $( this.options.dialog.cancelButton );
			this.dialog.$confirm	= $( this.options.dialog.confirmButton );

			return this;
		},

		build: function() {
			this.datatable = this.$table.DataTable({
				searching : false,
				ordering : true,
				paging : false,
				info : false,
				
				aoColumns: [
					null,
					null,
					null,
					{ "bSortable": false }
				]
			});

			window.dt = this.datatable;

			return this;
		},

		events: function() {
			var _self = this;

			this.$table
				.on('click', 'a.save-row', function( e ) {
					e.preventDefault();
					var purchaseId = $(this).attr("data-purchase-id");
					var offerId = $(this).attr("data-offer-id");
					_self.rowSave( $(this).closest( 'tr' ) , purchaseId, offerId );
				})
				.on('click', 'a.cancel-row', function( e ) {
					e.preventDefault();

					_self.rowCancel( $(this).closest( 'tr' ) );
				})
				.on('click', 'a.edit-row', function( e ) {
					e.preventDefault();

					_self.rowEdit( $(this).closest( 'tr' ) );
				})

			this.$addButton.on( 'click', function(e) {
				e.preventDefault();

				_self.rowAdd();
			});

			this.dialog.$cancel.on( 'click', function( e ) {
				e.preventDefault();
				$.magnificPopup.close();
			});

			return this;
		},

		// ==========================================================================================
		// ROW FUNCTIONS
		// ==========================================================================================
		rowAdd: function() {
			this.$addButton.attr({ 'disabled': 'disabled' });

			var actions,
				data,
				$row;

			actions = [
				'<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i> Kaydet</a>',
				'<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i> Vazgeç</a>',
				'<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i> Düzenle</a>'
			].join(' ');

			data = this.datatable.row.add([ '', '', '', actions ]);
			$row = this.datatable.row( data[0] ).nodes().to$();

			$row
				.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

			this.rowEdit( $row );

			this.datatable.order([0,'asc']).draw(); // always show fields
		},

		rowCancel: function( $row ) {
			var _self = this,
				$actions,
				i,
				data;

			if ( $row.hasClass('adding') ) {
				this.rowRemove( $row );
			} else {

				data = this.datatable.row( $row.get(0) ).data();
				this.datatable.row( $row.get(0) ).data( data );

				$actions = $row.find('td.actions');
				if ( $actions.get(0) ) {
					this.rowSetActionsDefault( $row );
				}

				this.datatable.draw();
			}
		},

		rowEdit: function( $row ) {
			var _self = this,
				data;

			data = this.datatable.row( $row.get(0) ).data();

			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );

				if ( $this.hasClass('actions') ) {
					_self.rowSetActionsEditing( $row );
				} else {
					if(i == 1){
						$this.html( '<input type="text" class="form-control input-block" style="width:90px"  value="' + data[i] + '"/>' );
					}else{
						$this.html( '<input type="text" class="form-control input-block" disabled  value="' + data[i] + '"/>' );
					}
				}
			});
		},

		rowSave: function( $row , purchaseId, offerId) {
			try{
				var _self     = this,
					$actions,
					values    = [];

				if ( $row.hasClass( 'adding' ) ) {
					this.$addButton.removeAttr( 'disabled' );
					$row.removeClass( 'adding' );
				}

				values = $row.find('td').map(function() {
					var $this = $(this);

					if ( $this.hasClass('actions') ) {
						_self.rowSetActionsDefault( $row );
						return _self.datatable.cell( this ).data();
					} else {
						return $.trim( $this.find('input').val() );
					}
				});
				
				this.datatable.row( $row.get(0) ).data( values );
				
				var amount = values[1];
				//-------------------------------//
				
				var request = $.ajax({
					url: "/ajax/operation-purchase.php",
					method: "GET",
					data : {
						purchaseId : purchaseId,
						offerId : offerId,
						amount : amount,
						msg : 'update-amount-purchaser'
					},
					dataType: "html"
				});
			 
				request.done(function( msg ) {
					var msgSplit = msg.split(":");
					if(msg === "true"){
						swal("Bilgilendirme", "İşleminiz başarı ile gerçekleştirilmiştir.", "success");
						//alert("İşleminiz başarı ile gerçekleştirilmiştir.");
						setTimeout(function(){
						   window.location.reload(1);
						}, 3000);
					}else{
						if(msgSplit[1] == "true"){
							swal("Bilgilendirme", msgSplit[0], "success");
						}else{
							swal("Bilgilendirme", msgSplit[0], "error");
						}
						//alert(msg);
						setTimeout(function(){
						   window.location.reload(1);
						}, 3000);
					}
				});
			 
				request.fail(function( jqXHR, textStatus ) {
					alert( "Request failed: " + textStatus );
				});
				
				//------------------------------//
				
				
				$actions = $row.find('td.actions');
				if ( $actions.get(0) ) {
					this.rowSetActionsDefault( $row );
				}

				this.datatable.draw();
			}catch(err){
				alert('Bilgilerin doğruluğundan emin olunuz! :'+err); 
			}
		},

		rowSetActionsEditing: function( $row ) {
			$row.find( '.on-editing' ).removeClass( 'hidden' );
			$row.find( '.on-default' ).addClass( 'hidden' );
		},

		rowSetActionsDefault: function( $row ) {
			$row.find( '.on-editing' ).addClass( 'hidden' );
			$row.find( '.on-default' ).removeClass( 'hidden' );
		}

	};

	$(function() {
		EditableTable.initialize();
	});

}).apply( this, [ jQuery ]);
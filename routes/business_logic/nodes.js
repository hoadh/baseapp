/****************************
 * nodes.js
 * Author: hoad
 * Created on: 2015-01-07
 * Description:
 * 		contains all functions for nodes of documents 
 ****************************/
var Node = require('../../database/models/node');

var nodes = {
		/**
		 * Get all nodes from db
		 * @param req
		 * @param res
		 */
		get_all: function (req, res) {
			Node.find({}, function(err, node) {
				if (err) {
					res.status(500).json({
						'message': 'Internal server error from getting all users. Please contact support@yourproject.com.'
					});
				}
				res.status(200).json(node);
			});
		},
		
		/**
		 * Create new node of document
		 * @param
		 * @return message: [string]
		 */
		create_new: function (req, res) {

			// Create new node
			var newNode = new Node({
				content: body.content,
				children: []
			});
			
			// Save to db
			newNode.save(function (err, newNode, numberAffected) {
				if (err) { // error
					res.status(500).json({
						'message': 'Database error. Please contact support@yourproject.com.'
					});
				}
				
				// Case "Add child card"
				if (body.parent_id != null && body.parent_id != '') {
					// Find parent_node for updating children list
					Node.findOne({_id: body.parent_id}, function(err, parent_node) {
						if (err) { // error
							res.status(500).json({
								'message': 'Internal server error from getting all users. Please contact support@yourproject.com.'
							});
						}
						
						// Add this node to children list of parent_node
						var new_children = parent_node.children;
						new_children.push(newNode._id);
						
						// Update db
						Node.update(
								{_id: parent_node._id},
								{
									$set: {children: new_children}
								},
								function(err, numAffected) {
									
									if (err) { // error
										res.status(500).json({
											'message': 'Internal server error from getting all users. Please contact support@yourproject.com.'
										});
									}
									
									// Return ok
									if (numAffected == 1) {
										res.status(201).json({
											'message': 'Successfully created new card'
										});
									}
								}
						);					
					});
				}
				
				// Case "Add root card"
				else {
					// Return ok
					if (numAffected == 1) {
						res.status(201).json({
							'message': 'Successfully created new card'
						});
					}
				}
			});
		}
};
module.exports = nodes;
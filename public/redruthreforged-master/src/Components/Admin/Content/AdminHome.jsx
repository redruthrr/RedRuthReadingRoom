import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Modal } from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import AdminContext from '../../../Context/AdminContext';
import moment from 'moment';
import PublicRecordButton from '../Buttons/PublicRecordButton';
import PublicListenButton from '../Buttons/PublicListenButton';
import NewCollection from '../util/NewCollection';

// This component returns the 'home' view of the admin page, AKA the user's collections.
// Returns some text and the table of collections/collection-related buttons

function AdminHome(props) {
	const { collections, updateCurrCollection, clearCurrResponse } = useContext(AdminContext);

	// Styling
	const rowStyle = {
		transition: '250ms',
		'&:hover': {
            backgroundColor: '#dae6ed',
        }
	}

	// Runs on component load
	useEffect(() => {
		clearCurrResponse(); // Clear currently selected response
	}, [])
	

	return (
		<Box>
			<Typography variant='h4'>Collections</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell width={100}>Recordings</TableCell>
							<TableCell width={100}>Unlistened</TableCell>
							<TableCell width={100}>Created</TableCell>
							<TableCell width={100}>Record Status</TableCell>
							<TableCell width={100}>Listen Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{collections.map((collection) => {
							return (
							<TableRow sx={rowStyle} key={collection.collection_id} >
								<TableCell onClick={() => updateCurrCollection(collection.collection_id, collection.title)}>{collection.title}</TableCell>
								<TableCell onClick={() => updateCurrCollection(collection.collection_id, collection.title)}>{collection.file_count}</TableCell>
								<TableCell onClick={() => updateCurrCollection(collection.collection_id, collection.title)}>{collection.unlistened_count}</TableCell>
								<TableCell onClick={() => updateCurrCollection(collection.collection_id, collection.title)}>{moment.utc(collection.created_dt).format("MMM Do, YYYY")}</TableCell>
								<TableCell><PublicRecordButton public_flg={collection.public_record_flg} collection_id={collection.collection_id} /></TableCell>
								<TableCell><PublicListenButton public_flg={collection.public_listen_flg} collection_id={collection.collection_id}/></TableCell>
							</TableRow>
							)
						})}
						<NewCollection />
					</TableBody>
				</Table>
			</TableContainer>
		</Box>

	)
}

export default AdminHome
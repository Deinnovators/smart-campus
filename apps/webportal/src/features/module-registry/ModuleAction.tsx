import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';
import { api } from '@webportal/services';
import React, { useCallback, useState } from 'react';

export interface ModuleActionProps {
  moduleId: number;
  onEditClick?: () => void;
  onDeleteSuccess?: (id: number) => void;
}

const ModuleAction: React.FC<ModuleActionProps> = ({
  moduleId,
  onDeleteSuccess,
  onEditClick,
}) => {
  const [anchor, setAnchor] = useState<any>(null);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const deleteModule = useCallback(async () => {
    setIsPopoverOpen(false);
    try {
      setIsDeleting(true);
      await api.modules.deleteModule(moduleId);
      setIsDeleting(false);
      onDeleteSuccess?.(moduleId);
    } catch (error) {}
    setIsDeleting(false);
  }, [moduleId, onDeleteSuccess]);

  const handleDeleteClick = useCallback((e: any) => {
    setAnchor(e.target);
    setIsPopoverOpen(true);
  }, []);

  return (
    <Box>
      <IconButton onClick={onEditClick}>
        <Edit />
      </IconButton>
      <IconButton onClick={handleDeleteClick}>
        {isDeleting ? (
          <CircularProgress color='inherit' size={24} />
        ) : (
          <Delete />
        )}
      </IconButton>
      <Popover
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        anchorEl={anchor}
        open={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}>
        <Box p={2}>
          <Typography>Are you sure to delete?</Typography>
          <Box
            flex={1}
            px={2}
            mt={1}
            justifyContent='center'
            alignItems='center'>
            <Button onClick={deleteModule} color='error'>
              Delete
            </Button>
            <Button onClick={() => setIsPopoverOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default ModuleAction;

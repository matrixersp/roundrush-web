import { Box, Chip, Link as MuiLink, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Urgent,
  High,
  Medium,
  Low,
  Task,
  Bug,
  Macro,
  ArrowRight as ArrowRightIcon,
} from 'icons';

const getPriorityIcon = (priority: string) => {
  const icon: Record<string, React.ReactNode> = {
    urgent: <Urgent />,
    high: <High />,
    medium: <Medium />,
    low: <Low />,
  };

  return icon[priority] || <Low />;
};

const getIssueTypeIcon = (priority: string) => {
  const icon: Record<string, React.ReactNode> = {
    bug: <Bug />,
    task: <Task />,
    macro: <Macro />,
  };

  return icon[priority] || <Task />;
};

const todoIssues = [
  {
    id: 1,
    priority: 'urgent',
    type: 'task',
    title: 'Create a new project in Roundrush, and add all the team members',
    issueId: 'WMS-20',
    module: {
      id: 1,
      name: 'LD website',
      color: '#61D26F',
    },
  },
  {
    id: 2,
    priority: 'urgent',
    type: 'bug',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 2,
      name: 'Roundrush',
      color: '#1FAAE9',
    },
  },
  {
    id: 3,
    priority: 'high',
    type: 'bug',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 2,
      name: 'Roundrush',
      color: '#1FAAE9',
    },
  },
  {
    id: 4,
    priority: 'medium',
    type: 'macro',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 1,
      name: 'LD website',
      color: '#61D26F',
    },
  },
  {
    id: 5,
    priority: 'low',
    type: 'task',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 3,
      name: 'Marketing',
      color: '#7A6FEF',
    },
  },
  {
    id: 6,
    priority: 'high',
    type: 'bug',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 4,
      name: 'Roundrush Website',
      color: '#4086E0',
    },
  },
  {
    id: 7,
    priority: 'medium',
    type: 'macro',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 4,
      name: 'Roundrush Website',
      color: '#4086E0',
    },
  },
];

const reviewIssues = [
  {
    id: 1,
    priority: 'urgent',
    type: 'task',
    title: 'Create a new project in Roundrush, and add all the team members',
    issueId: 'WMS-20',
    module: {
      id: 1,
      name: 'LD website',
      color: '#61D26F',
    },
  },
  {
    id: 2,
    priority: 'urgent',
    type: 'bug',
    title: 'Create a new project, and add all the team members',
    issueId: 'WMS-20',
    module: {
      id: 2,
      name: 'Roundrush',
      color: '#1FAAE9',
    },
  },
  {
    id: 3,
    priority: 'high',
    type: 'task',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 2,
      name: 'Roundrush',
      color: '#1FAAE9',
    },
  },
  {
    id: 4,
    priority: 'medium',
    type: 'macro',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 1,
      name: 'LD website',
      color: '#61D26F',
    },
  },
  {
    id: 5,
    priority: 'low',
    type: 'task',
    title: 'Create a new project, and add all the team members',
    issueId: 'WMS-20',
    module: {
      id: 3,
      name: 'Marketing',
      color: '#7A6FEF',
    },
  },
  {
    id: 6,
    priority: 'high',
    type: 'bug',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 4,
      name: 'Roundrush Website',
      color: '#4086E0',
    },
  },
  {
    id: 7,
    priority: 'medium',
    type: 'macro',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 4,
      name: 'LD website',
      color: '#61D26F',
    },
  },
  {
    id: 8,
    priority: 'medium',
    type: 'macro',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 4,
      name: 'Roundrush',
      color: '#1FAAE9',
    },
  },
  {
    id: 9,
    priority: 'high',
    type: 'bug',
    title: 'Create a new project',
    issueId: 'WMS-20',
    module: {
      id: 4,
      name: 'Roundrush Website',
      color: '#4086E0',
    },
  },
];

type Props = {};
export const ProjectSection = (props: Props) => {
  const space = 'ld';

  const renderIssues = (issues: any[]) => {
    return issues.map(({ title, priority, type, issueId, module }, index) => (
      <IssueItemStyled key={index}>
        <IssueLeftStyled>
          <IssueIconWrapper>{getPriorityIcon(priority)}</IssueIconWrapper>
          <IssueIconWrapper>{getIssueTypeIcon(type)}</IssueIconWrapper>
          <Box>
            <Typography variant="body2">{issueId}</Typography>
            <Typography variant="body2">{title}</Typography>
          </Box>
        </IssueLeftStyled>
        <IssueRightStyled>
          <Chip
            label={module.name}
            size="small"
            sx={{ bgcolor: module.color }}
          />
        </IssueRightStyled>
      </IssueItemStyled>
    ));
  };

  return (
    <ContainerStyled>
      <Box sx={{ marginBottom: '50px' }}>
        <Typography variant="h5" color="primary">
          Marketing
        </Typography>
        <MuiLink component={Link} to={`/${space}/development`}>
          <Typography variant="body2">Go to project</Typography>
          <ArrowRightIcon />
        </MuiLink>
      </Box>
      <Box>
        <IssuesContainerStyled>
          <Typography variant="h6" gutterBottom component="div">
            Todos
            <Chip label={todoIssues.length} />
          </Typography>
          <Box sx={{ height: 240 }}>{renderIssues(todoIssues)}</Box>
        </IssuesContainerStyled>
      </Box>
      <Box>
        <IssuesContainerStyled>
          <Typography variant="h6" gutterBottom component="div">
            Pending Reviews
            <Chip
              label={reviewIssues.length}
              style={{
                background: 'rgb(245, 166, 35, 0.25)',
                color: '#F5A623',
              }}
            />
          </Typography>
          <Box sx={{ height: 240 }}>{renderIssues(reviewIssues)}</Box>
        </IssuesContainerStyled>
      </Box>
    </ContainerStyled>
  );
};

const ContainerStyled = styled(Box)(({ theme }) => ({
  '& > :first-of-type': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiTypography-root': {
      margin: 0,
    },
    '& .MuiLink-root': {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.secondary,
      '& .MuiTypography-root': {
        fontSize: '0.75rem',
      },
      '& svg': {
        marginLeft: 8,
      },
    },
  },
}));

const IssuesContainerStyled = styled(Box)(({ theme }) => ({
  marginTop: 30,
  marginBottom: 24,
  '& > .MuiTypography-root': {
    fontSize: '1.25rem',
    marginBottom: 24,
    '& > .MuiChip-root': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
      marginLeft: 16,
      height: 24,
      '& .MuiChip-label': {
        padding: '0 8px',
      },
    },
  },
  '& > .MuiBox-root': {
    overflowY: 'auto',
  },
}));

const IssueItemStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 36,
  alignItems: 'center',
  paddingTop: theme.spacing(0.75),
  paddingBottom: theme.spacing(0.75),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiChip-root': {
    color: theme.palette.common.white,
  },
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
}));

const IssueLeftStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  minWidth: 100,
  flex: 1,
  '& .MuiBox-root': {
    display: 'flex',
    minWidth: 0,
    width: '100%',
    marginRight: 4,
    '& .MuiTypography-root': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      '&:first-of-type': {
        marginRight: 10,
        fontWeight: '500',
        textTransform: 'uppercase',
        flexShrink: 0,
      },
    },
  },
}));

const IssueRightStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 0,
}));

const IssueIconWrapper = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(1.25),
  width: 24,
  height: 24,
}));

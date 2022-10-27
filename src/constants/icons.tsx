import { CSSProperties } from 'react'
import {
   AddBox,
   ArrowUpward,
   Check,
   ChevronLeft,
   ChevronRight,
   Clear,
   DeleteOutline,
   Edit,
   FilterList,
   FirstPage,
   LastPage,
   Remove,
   SaveAlt,
   Search,
   ViewColumn,
   Cloud,
   Build,
   BarChartRounded,
   PageviewRounded,
   LiveHelp,
   Settings,
   Person,
   SupervisorAccount,
   Home,
   AddCircle,
   FindInPage,
   TrendingUp,
   Flag,
   CardMembership,
   Man,
   Woman,
   SendAndArchive,
   MarkEmailRead,
   MarkEmailUnread,
   HourglassDisabled,
   AccountTree,
   FactCheck,
   SupportAgent,
   StorageRounded,
   GroupsRounded,
   EmailOutlined,
   MarkEmailReadOutlined,
   PendingActionsOutlined,
   TaskOutlined,
   ContentPasteSearchOutlined,
   CleaningServicesRounded,
   QueryStatsRounded,
   AssignmentRounded,
   AssignmentTurnedInRounded,
   AssignmentLateRounded,
   HistoryToggleOffRounded,
   GradingRounded,
   EngineeringRounded,
   DataObjectRounded,
   EventNoteRounded,
   QueryBuilderRounded,
   StackedLineChartRounded,
   FlightLandRounded,
   FlightTakeoffRounded,
   BoyRounded,
   GirlRounded
} from '@mui/icons-material'

const classes: { [key: string]: CSSProperties } = {
   subModIcon: {
      fontSize: 70
   }
}

export const elementIcons = {
   Ceremonies: <CardMembership fontSize='large' />,
   Nationalized: <Flag fontSize='large' />,
   Man: <Man fontSize='large' />,
   Woman: <Woman fontSize='large' />,
   EmailOutlined: <EmailOutlined fontSize='large' />,
   MarkEmailReadOutlined: <MarkEmailReadOutlined fontSize='large' />,
   PendingActionsOutlined: <PendingActionsOutlined fontSize='large' />,
   TaskOutlined: <TaskOutlined fontSize='large'/>,

   /* » MOD'S...  */
   Home: <Home fontSize='small' sx={{ color: 'white' }} />,
   Person: <Person fontSize='small' sx={{ color: 'white' }} />,
   SupervisorAccount: <SupervisorAccount fontSize='small' />,
   AddBox: <AddBox fontSize='small' />,
   Settings: <Settings fontSize='small' />,
   LiveHelp: <LiveHelp fontSize='small' />,
   BarChartRounded: <BarChartRounded fontSize='small' />,
   AccountTree: <AccountTree fontSize='small' />,
   EngineeringRounded: <EngineeringRounded fontSize='small' />,

   /* » SUB-MOD'S...  */
   Create: <AddCircle color='action' style={classes.subModIcon} />,
   FindInPage: <FindInPage color='action' style={classes.subModIcon} />,
   TrendingUp: <TrendingUp color='action' style={classes.subModIcon} />,
   SupportAgent: <SupportAgent color='action' style={classes.subModIcon} />,
   FactCheck: <FactCheck color='action' style={classes.subModIcon} />,
   StorageRounded: <StorageRounded color='action' style={classes.subModIcon} />,
   GroupsRounded: <GroupsRounded color='action' style={classes.subModIcon} />,
   ContentPasteSearchOutlined: <ContentPasteSearchOutlined color='action' style={classes.subModIcon} />,
   CleaningServicesRounded: <CleaningServicesRounded color='action' style={ classes.subModIcon } />,
   QueryStatsRounded: <QueryStatsRounded color='action' style={ classes.subModIcon } />,
   GradingRounded: <GradingRounded color='action' style={ classes.subModIcon } />,
   DataObjectRounded: <DataObjectRounded color='action' style={ classes.subModIcon } />,
   EventNoteRounded: <EventNoteRounded color='action' style={ classes.subModIcon }/>,
   QueryBuilderRounded: <QueryBuilderRounded color='action' style={ classes.subModIcon }/>,
   StackedLineChartRounded: <StackedLineChartRounded color='action' style={ classes.subModIcon }/>,

   Test: <Build />,
   Cloud: <Cloud />,
   Check: <Check />,
   Clear: <Clear />,
   Delete: <DeleteOutline />,
   DetailPanel: <ChevronRight />,
   Edit: <Edit />,
   PageviewRounded: <PageviewRounded />,

   /* » ...  */
   SendAndArchive: <SendAndArchive fontSize='large' />,
   MarkEmailRead: <MarkEmailRead fontSize='large' />,
   MarkEmailUnread: <MarkEmailUnread fontSize='large' />,
   HourglassDisabled: <HourglassDisabled fontSize='large' />,

   /* ► USED COMPONENT: `InfoCard` ... */
   Assignment: <AssignmentRounded fontSize='large' />,
   AssignmentComplete: <AssignmentTurnedInRounded fontSize='large' />,
   AssignmentPendent: <AssignmentLateRounded fontSize='large' />,
   AssignmentCompleteToday: <HistoryToggleOffRounded fontSize='large' />,
   PlaneEntry: <FlightLandRounded fontSize='large' />,
   PlaneTakeOff: <FlightTakeoffRounded fontSize='large' />,
   BoyRounded: <BoyRounded fontSize='large' />,
   GirlRounded: <GirlRounded fontSize='large' />

}

export const componentIcons: any = {
   Export: SaveAlt,
   Filter: FilterList,
   FirstPage,
   LastPage,
   NextPage: ChevronRight,
   PreviousPage: ChevronLeft,
   ResetSearch: Clear,
   Search,
   SortArrow: ArrowUpward,
   ThirdStateCheck: Remove,
   ViewColumn
}

export type IconAppTypes = keyof typeof elementIcons

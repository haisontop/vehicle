import { merge } from 'lodash';
import Card from './Card';
import Tabs from './Tabs';
import Grid from './Grid';
import Link from './Link';
import Lists from './Lists';
// import Table from './Table';
import Badge from './Badge';
import Paper from './Paper';
import Input from './Input';
import Drawer from './Drawer';
import Dialog from './Dialog';
import Avatar from './Avatar';
import Slider from './Slider';
import Button from './Button';
import Switch from './Switch';
import Select from './Select';
import SvgIcon from './SvgIcon';
import Tooltip from './Tooltip';
import Popover from './Popover';
import Stepper from './Stepper';
import DataGrid from './DataGrid';
import Skeleton from './Skeleton';
import Backdrop from './Backdrop';
import Checkbox from './Checkbox';
import Container from './Container';
import Typography from './Typography';
import Pagination from './Pagination';
import IconButton from './IconButton';
import ButtonGroup from './ButtonGroup';
import ToggleButton from './ToggleButton';
import LoadingButton from './LoadingButton';
import TextField from './TextField';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Tabs(theme),
    Card(theme),
    Grid(theme),
    Link(theme),
    Input(theme),
    Badge(theme),
    Lists(theme),
    // Table(theme),
    Paper(theme),
    Switch(theme),
    Select(theme),
    Button(theme),
    Dialog(theme),
    Avatar(theme),
    Slider(theme),
    Drawer(theme),
    Stepper(theme),
    Tooltip(theme),
    Popover(theme),
    SvgIcon(theme),
    Checkbox(theme),
    DataGrid(theme),
    Skeleton(theme),
    Backdrop(theme),
    Container(theme),
    IconButton(theme),
    Typography(theme),
    Pagination(theme),
    ButtonGroup(theme),
    ToggleButton(theme),
    LoadingButton(theme),
    TextField(theme)
  );
}

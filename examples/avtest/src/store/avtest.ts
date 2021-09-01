import { RootState } from '@/store/types';
import { Module } from 'vuex';
import { Device, enumerate_devices } from '@/util/avtest';
import {UAParser} from 'ua-parser-js';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
const namespaced: boolean = true;

// Yasi -This pattern lets you devine a typed state object. Vuex was implemented
// in javascript so its intrinsically untyped. My bet is that there will be a
// rewrite of Vuex in the near future with type support until then we have to
// plug in our own typing and do some explicit casting in the compontents
export interface AVTestState {
  all_devices: Device[];
  ua_string: string;
  ua_parser?: UAParser;
  recording_status: string;
  video_status: string;
}
// Yasi - This is the mock data we serialize to the backend it is 'fetched' by fetch_state_from_server action
const mock_avtest_state = {
  // ToDo: mock all_devices
  all_devices: [{ deviceId: 'default',
                  kind: 'audioinput', 
                  label: 'This is a Test Audio Device',
                  status: 'Nominal'} ],
  ua_string: 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0',
  recording_status: 'User has successfully created a recording',
  video_status: 'Failed Video Stream',
};

const default_state: AVTestState = {
  all_devices: [],
  ua_string: '',
  ua_parser: new UAParser(),
  recording_status: 'No Recording Found',
  video_status: 'No Video Stream Found', 
};

export const avtest: Module<AVTestState, RootState> = {
  namespaced,
  // This is the default state
  state: default_state,  
  getters: {
    browser: state => {
      return state.ua_parser ? state.ua_parser.getBrowser() : '';
    },
    operating_system: state => {
      return state.ua_parser ? state.ua_parser.getOS() : '';      
    },    
    compat_object: state => {
      const info = { platform: '', platform_version: '', browser: '', browser_version: '' };
      if (state.ua_parser) {
        // info = { platform: state.ua_parser.getOS().name,
        //   platform_version: parser.getOS().version,
        //   browser: parser.getBrowser().name,
        //   browser_version: parser.getBrowser().version,
        //  };
        return info;
      } else {
        return info;
      }
    },
    recording_status: state => {
      return state.recording_status ? state.recording_status : '';
    },
    video_status: state => {
      return state.video_status ? state.video_status : '';
    },
  },
  // These respond to commit and are by nature synchronus
  mutations: {
    // Mutations update state synchronusly - set_ is a convention Note the use
    // of the state type AVTestState - this gives you language support inside
    // the body of the method.
    set_ua_parser: (state: AVTestState, value: UAParser) => {
      state.ua_parser = value;
    },
    set_all_devices: (state: AVTestState, value: Device[]) => {
      state.all_devices = value;
    },
    set_recording_status: (state: AVTestState, value: string) => {
      state.recording_status = value;
    },
    set_video_status: (state: AVTestState, value: string) => {
      state.video_status = value;
    },
  },
  // These respond to dispatch and are by nature async  
  actions: {
    
    fetch_state_from_server: async (context: any) => {
      console.log(`Vue.$offline is true so we are restoring the state from server`);
      // ToDo: fetch ua string from server for now just use the mock
      const state = mock_avtest_state;
      // create the parser from the ua_string
      const parser = new UAParser(state.ua_string); 
      context.commit('set_ua_parser', parser);
      // ToDo: how to serialize all_devices?
      context.commit('set_all_devices', state.all_devices);
      context.commit('set_recording_status', state.recording_status);
      context.commit('set_video_status', state.video_status);
    },

    fetch_state_from_local: async (context: any) => {
      console.log(`Vue.$offline is false so we are looking at local devices`);
      const devices = await enumerate_devices();
      context.commit('set_all_devices', devices);
    },
    
    enumerate_devices: async (context: any, message: string) => {
      const devices = await enumerate_devices();
      context.commit('set_all_devices', devices);
    },

    recording_status: async (context: any, status: string) => {
      context.commit('set_recording_status', status);
    },

    video_status: async (context: any, status: string) => {
      context.commit('set_video_status', status);
    },
  },
};
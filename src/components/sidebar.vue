<template>
  <div class="sidebar">
    <template v-if="needTransition">
      <el-collapse-transition>
        <el-menu
          v-show="sidebar.collapse"
          class="sidebar-el-menu"
          :default-active="onRoutes"
          background-color="#324157"
          text-color="#bfcbd9"
          active-text-color="#20a0ff"
          unique-opened
          router
        >
          <template v-for="item in items">
            <template v-if="item.subs">
              <el-sub-menu
                :index="item.index"
                :key="item.index"
                v-permiss="item.permiss"
              >
                <template #title>
                  <el-icon>
                    <component :is="item.icon"></component>
                  </el-icon>
                  <span>{{ item.title }}</span>
                </template>
                <template v-for="subItem in item.subs">
                  <el-sub-menu
                    v-if="subItem.subs"
                    :index="subItem.index"
                    :key="subItem.index"
                    v-permiss="item.permiss"
                  >
                    <template #title>{{ subItem.title }}</template>
                    <el-menu-item
                      v-for="(threeItem, i) in subItem.subs"
                      :key="i"
                      :index="threeItem.index"
                      @click="collapseChage"
                    >
                      {{ threeItem.title }}
                    </el-menu-item>
                  </el-sub-menu>
                  <el-menu-item
                    v-else
                    :index="subItem.index"
                    v-permiss="item.permiss"
                    :key="subItem.index"
										@click="collapseChage"
                  >
                    {{ subItem.title }}
                  </el-menu-item>
                </template>
              </el-sub-menu>
            </template>
            <template v-else>
              <el-menu-item
                :index="item.index"
                :key="item.index"
                v-permiss="item.permiss"
								@click="collapseChage"
              >
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <template #title>{{ item.title }}</template>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-collapse-transition>
    </template>
    <template v-else>
      <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="sidebar.collapse"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        unique-opened
        router
      >
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-sub-menu
              :index="item.index"
              :key="item.index"
              v-permiss="item.permiss"
            >
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-sub-menu
                  v-if="subItem.subs"
                  :index="subItem.index"
                  :key="subItem.index"
                  v-permiss="item.permiss"
                >
                  <template #title>{{ subItem.title }}</template>
                  <el-menu-item
                    v-for="(threeItem, i) in subItem.subs"
                    :key="i"
                    :index="threeItem.index"
                  >
                    {{ threeItem.title }}
                  </el-menu-item>
                </el-sub-menu>
                <el-menu-item
                  v-else
                  :index="subItem.index"
                  v-permiss="item.permiss"
                  :key="subItem.index"
                >
                  {{ subItem.title }}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item
              :index="item.index"
              :key="item.index"
              v-permiss="item.permiss"
            >
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSidebarStore } from "../store/sidebar";
import { useTransitionStore } from '../store/transition'
import { useRoute } from "vue-router";
const items = [
  {
    icon: "Odometer",
    index: "/dashboard",
    title: "????????????",
    permiss: "1",
  },
  {
    icon: "Calendar",
    index: "/table",
    title: "????????????",
    permiss: "2",
  },
  {
    icon: "DocumentCopy",
    index: "/tabs",
    title: "tab?????????",
    permiss: "3",
  },
  {
    icon: "Edit",
    index: "3",
    title: "????????????",
    permiss: "4",
    subs: [
      {
        index: "/form",
        title: "????????????",
        permiss: "5",
      },
      {
        index: "/upload",
        title: "????????????",
        permiss: "6",
      },
      {
        index: "4",
        title: "????????????",
        permiss: "7",
        subs: [
          {
            index: "/editor",
            title: "??????????????????",
            permiss: "8",
          },
          {
            index: "/markdown",
            title: "markdown?????????",
            permiss: "9",
          },
        ],
      },
    ],
  },
  {
    icon: "Setting",
    index: "/icon",
    title: "???????????????",
    permiss: "10",
  },
  {
    icon: "PieChart",
    index: "/charts",
    title: "schart??????",
    permiss: "11",
  },
  {
    icon: "Warning",
    index: "/permission",
    title: "????????????",
    permiss: "13",
  },
  {
    icon: "CoffeeCup",
    index: "/donate",
    title: "????????????",
    permiss: "14",
  },
];
const route = useRoute();
const onRoutes = computed(() => {
  return route.path;
});
const sidebar = useSidebarStore();
// ???????????????
const collapseChage = () => {
  sidebar.handleCollapse();
};

const transition = useTransitionStore();

let needTransition = transition.$state.transition

</script>

<style scoped>
@media only screen and (min-device-width: 768px) {
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar {
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
  .sidebar > ul {
    height: 100%;
  }
}

@media only screen and (max-device-width: 768px) {
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    width: 100%;
    overflow-x: scroll;
  }
  .el-menu--collapse {
    display: none;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 100%;
    z-index: 100;
  }
}
</style>

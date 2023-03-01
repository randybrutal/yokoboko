<template lang="pug">
    .time-show
        .top-time
            .left-time {{ timeSheet }}
            .right-time {{ twelveType }}
        .bottom-date {{ date }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getTimeGMT } from '@/utils/toolnumber';

@Component
export default class TimeShow extends Vue {
    protected timeSheet: any = '';

    protected twelveType = '';

    protected day = '';

    protected month = '';

    protected year = '';

    protected date = '';

    protected timeCode = 0;

    protected loading = false;

    protected created() {
        this.$nextTick(() => {
            this.loading = true;
            this.getTimeStamp();
            this.getTime();
            window.addEventListener('visibilitychange', () => {
                if (document.hidden === false) {
                    this.getTimeStamp();
                }
            });
        });
    }

    protected async getTimeStamp() {
        this.timeCode = getTimeGMT(8, new Date());
        // this.loading = false;
        // this.loading = true;
        // const { status, response } = await (this as any).$_asyncify(getNowTime());
        // if (status && response) {
        //     if (response.data) {
        //         this.timeCode = getTimeGMT(8, new Date(R.clone(response.data.now_time) * 1000));
        //         this.loading = false;
        //     }
        // }
    }

    protected getTime() {
        this.timeCode += 1000;
        const monthMap: Record<any, any> = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        };

        const showTime = new Date(this.timeCode);
        const times = new Date(this.timeCode).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).split(' ');

        [this.timeSheet, this.twelveType] = times;

        this.day = String(showTime.getDate());

        this.month = monthMap[String(showTime.getMonth())];

        this.year = String(showTime.getFullYear());

        this.date = `${this.day} ${this.month}, ${this.year}`;

        setTimeout(this.getTime, 1000);
    }
}
</script>
<style lang="scss" scoped>
.time-show::v-deep {
    font-family: Helvetica Neue, Helvetica Neue-Regular;
    .top-time {
        .left-time {
            float: left;
            color: #FFF;
            font-size: 16px;
        }
        .right-time {
            float: left;
            font-size: 12px;
            color: #BEBEBE;
        }
    }
    .bottom-date {
        clear: both;
        color: #BEBEBE;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        .top-time {
            .right-time {
                margin-left: 5px;
            }
        }
    }
    @media (min-width: 480px) and (max-width: 768px) {
        .top-time {
            .right-time {
                margin-left: 5px;
            }
        }
    }
    @media (min-width: 768px){
        .top-time {
            .left-time {
                padding-top: 6px;
                font-size: 28px;
            }
        }
        .bottom-date {
            font-size: 12px;
            text-align: left;
            padding-left: 20px;
        }
    }
}
</style>

import { SleepLogs } from "./sleeps";
import { Friends, User } from "./friends";
import { User } from './user';

interface HypertonicFuncsInterface {
    getProfile(): Promise<User>;
    getBadges(): Promise<any>;
    getFavoriteActivities(): Promise<any>;
    getFrequentActivities(): Promise<any>;
    getRecentActivities(): Promise<any>;
    getFriends(friends?: string): Promise<Friends>;
    getSleepLogs(from: string, to?: string): Promise<SleepLogs>;
    getSummary(date?: string): Promise<any>;
    getTimeSeries(activity: string, from: string, to: string): Promise<any>;
    getBodyGoal(bodyMetric: string): Promise<any>;
    getBodyTimeSeries(bodyMetric: string, from: string, to: string): Promise<any>;
    getBodyFatLogs(from: string, to?: string): Promise<any>;
    getInvitations(): Promise<any>;
    getLifetimeStats(): Promise<any>;
    getActivityLogsList(): Promise<any>;
    getActivityTCX(logId: string): Promise<any>;
    getActivityType(activityId: string): Promise<any>;
    getActivityTypes(): Promise<any>;
    getActivityGoals(period: string): Promise<any>;
    getDevices(): Promise<any>;
    getAlarms(trackerId: string): Promise<any>;
    getFood(foodType: string): Promise<any>;
    getFrequentFoods(): Promise<any>;
    getFavoriteFoods(): Promise<any>;
    getRecentFoods(): Promise<any>;
    getMeal(mealId: string): Promise<any>;
    getMeals(): Promise<any>;
    getFoodGoals(): Promise<any>;
    getFoodLocales(): Promise<any>;
    getFoodUnits(): Promise<any>;
    getWaterGoals(): Promise<any>;
    getFoodTimeSeries(from?: string, to?: string): Promise<any>;
    getWaterTimeSeries(from?: string, to?: string): Promise<any>;
    getFoodLogs(date?: string): Promise<any>;
    getWaterLogs(date?: string): Promise<any>;
    getBodyWeightLogs(from: string, to?: string): Promise<any>;
    getSleepGoal(): Promise<any>;
    getSleepLogsList(beforeDate: string, afterDate: string, sort: string, limit: string): Promise<any>;
};
interface HypertonicInterface {
    (token: string): HypertonicFuncsInterface;
};


declare const hypertonic: HypertonicInterface;

export = hypertonic;
